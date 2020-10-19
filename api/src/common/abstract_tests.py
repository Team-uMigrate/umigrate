import json
from rest_framework import status
from types import SimpleNamespace


def create_data(factory_class, serializer_class, pop_keys):
    post_item = factory_class()
    serializer = serializer_class(post_item, context={'request': SimpleNamespace(user=post_item.creator)})
    serialized_data = json.loads(json.dumps(serializer.data))
    data = serialized_data.copy()

    for key in serialized_data:
        if isinstance(data[key], dict) or data[key] is None or data[key] == []:
            data.pop(key)

    for key in pop_keys:
        data.pop(key)

    return data


class AbstractAPITestCase:
    api_client = None
    assert_equal = None
    assert_list_equal = None
    endpoint = None
    model_class = None
    serializer_class = None
    detail_serializer_class = None
    factory_class = None
    pop_keys = None
    max_diff = None

    def setUp(self):
        items = self.factory_class.create_batch(5)
        self.api_client.login(email=items[0].creator.email, password='Top$ecret150')

    def test_list(self):
        response = self.api_client.get(self.endpoint)
        self.assert_equal(response.status_code, status.HTTP_200_OK, 'Status code should be 200. '
                                                                    f'Error: {response.data}')

        results = response.data['results']
        items = self.model_class.objects.all()
        self.assert_equal(len(results), len(items), f"There should be {len(items)} results")

        context = {'request': SimpleNamespace(user=items[0].creator)}
        serialized_items = self.detail_serializer_class(items, context=context, many=True).data
        self.assert_list_equal(results, serialized_items, "Results should match items in the database")

    def test_create(self):
        data = create_data(factory_class=self.factory_class, serializer_class=self.serializer_class,
                           pop_keys=self.pop_keys)
        response = self.api_client.post(self.endpoint, data)
        self.assert_equal(response.status_code, status.HTTP_201_CREATED, 'Status code should be 201. '
                                                                         f'Error: {response.data}')

        result = response.data
        item = self.model_class.objects.get(id=result['id'])
        context = {'request': SimpleNamespace(user=item.creator)}
        serialized_item = self.serializer_class(item, context=context).data
        self.assert_equal(result, serialized_item, "Result should match item in the database")

    def test_retrieve(self):
        response = self.api_client.get(f'{self.endpoint}1')
        self.assert_equal(response.status_code, status.HTTP_200_OK, 'Status code should be 200. '
                                                                    f'Error: {response.data}')

        result = response.data
        item = self.model_class.objects.get(id=1)
        context = {'request': SimpleNamespace(user=item.creator)}
        serialized_item = self.detail_serializer_class(item, context=context).data
        self.assert_equal(result, serialized_item, "Result should match item in the database")

    def test_update(self):
        data = create_data(factory_class=self.factory_class, serializer_class=self.serializer_class,
                           pop_keys=self.pop_keys)
        response = self.api_client.put(f'{self.endpoint}1', data)
        self.assert_equal(response.status_code, status.HTTP_200_OK, 'Status code should be 200. '
                                                                    f'Error: {response.data}')

        result = response.data
        item = self.model_class.objects.get(id=1)
        context = {'request': SimpleNamespace(user=item.creator)}
        serialized_item = self.serializer_class(item, context=context).data
        self.assert_equal(result, serialized_item, "Result should match item in the database")

        result = json.loads(json.dumps(result))
        result_copy = result.copy()
        for key in result_copy:
            if key not in data:
                result.pop(key)

        self.assert_equal(result, data, 'Result should match request data')

    def test_update_partial(self):
        data = create_data(factory_class=self.factory_class, serializer_class=self.serializer_class,
                           pop_keys=self.pop_keys)
        response = self.api_client.patch(f'{self.endpoint}1', data)
        self.assert_equal(response.status_code, status.HTTP_200_OK, 'Status code should be 200. '
                                                                    f'Error: {response.data}')

        result = response.data
        item = self.model_class.objects.get(id=1)
        context = {'request': SimpleNamespace(user=item.creator)}
        serialized_item = self.serializer_class(item, context=context).data
        self.assert_equal(result, serialized_item, "Result should match item in the database")

        result = json.loads(json.dumps(result))
        result_copy = result.copy()
        for key in result_copy:
            if key not in data:
                result.pop(key)

        self.assert_equal(result, data, 'Result should match request data')

    def test_destroy(self):
        response = self.api_client.delete(f'{self.endpoint}1')
        self.assert_equal(response.status_code, status.HTTP_204_NO_CONTENT, 'Status code should be 204. '
                                                                            f'Error: {response.data}')

        item = self.model_class.objects.filter(id=1)
        self.assert_equal(len(item), 0, 'Item should be removed from the database')
