import json
from rest_framework import status
from types import SimpleNamespace
from users.factories import UserFactory


def create_data(factory_class, serializer_class, pop_keys):
    post_item = factory_class()
    serializer = serializer_class(
        post_item,
        context={
            "request": SimpleNamespace(
                user=(
                    post_item.creator
                    if hasattr(post_item, "creator")
                    else post_item.members.first()
                )
            )
        },
    )
    serialized_data = json.loads(json.dumps(serializer.data))
    data = serialized_data.copy()

    for key in serialized_data:
        if isinstance(data[key], dict) or data[key] is None or data[key] == []:
            data.pop(key)

    for key in pop_keys:
        if key in data:
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
    factory_kwargs = None
    pop_keys = None
    max_diff = None
    save_options = []

    def setUp(self):
        user = UserFactory(connected_users=[], blocked_users=[])
        items = self.factory_class.create_batch(5, creator=user, **self.factory_kwargs)
        self.api_client.login(email=user.email, password="Top$ecret150")

    def test_list(self):
        response = self.api_client.get(self.endpoint)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )

        results = response.data["results"]
        items = self.model_class.objects.all()
        self.assert_equal(
            len(results), len(items), f"There should be {len(items)} results"
        )

        context = {
            "request": SimpleNamespace(
                user=(
                    items[0].creator
                    if hasattr(items[0], "creator")
                    else items[0].members.first()
                )
            )
        }
        serialized_items = self.detail_serializer_class(
            items, context=context, many=True
        ).data
        self.assert_list_equal(
            results, serialized_items, "Results should match items in the database"
        )

    def test_create(self):
        data = create_data(
            factory_class=self.factory_class,
            serializer_class=self.serializer_class,
            pop_keys=self.pop_keys,
        )
        response = self.api_client.post(self.endpoint, data)
        self.assert_equal(
            response.status_code,
            status.HTTP_201_CREATED,
            "Status code should be 201. " f"Error: {response.data}",
        )

        result = response.data
        item = self.model_class.objects.get(id=result["id"])
        context = {
            "request": SimpleNamespace(
                user=(
                    item.creator if hasattr(item, "creator") else item.members.first()
                )
            )
        }
        serialized_item = self.serializer_class(item, context=context).data
        self.assert_equal(
            result, serialized_item, "Result should match item in the database"
        )

    def test_retrieve(self):
        response = self.api_client.get(f"{self.endpoint}1")
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )

        result = response.data
        item = self.model_class.objects.get(id=1)
        context = {
            "request": SimpleNamespace(
                user=(
                    item.creator if hasattr(item, "creator") else item.members.first()
                )
            )
        }
        serialized_item = self.detail_serializer_class(item, context=context).data
        self.assert_equal(
            result, serialized_item, "Result should match item in the database"
        )

    def test_update(self):
        data = create_data(
            factory_class=self.factory_class,
            serializer_class=self.serializer_class,
            pop_keys=self.pop_keys,
        )
        response = self.api_client.put(f"{self.endpoint}1", data)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )

        result = response.data
        item = self.model_class.objects.get(id=1)
        context = {
            "request": SimpleNamespace(
                user=(
                    item.creator if hasattr(item, "creator") else item.members.first()
                )
            )
        }
        serialized_item = self.serializer_class(item, context=context).data
        self.assert_equal(
            result, serialized_item, "Result should match item in the database"
        )

        result = json.loads(json.dumps(result))
        result_copy = result.copy()
        for key in result_copy:
            if key not in data:
                result.pop(key)

        self.assert_equal(result, data, "Result should match request data")

    def test_update_partial(self):
        data = create_data(
            factory_class=self.factory_class,
            serializer_class=self.serializer_class,
            pop_keys=self.pop_keys,
        )
        response = self.api_client.patch(f"{self.endpoint}1", data)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )

        result = response.data
        item = self.model_class.objects.get(id=1)
        context = {
            "request": SimpleNamespace(
                user=(
                    item.creator if hasattr(item, "creator") else item.members.first()
                )
            )
        }
        serialized_item = self.serializer_class(item, context=context).data
        self.assert_equal(
            result, serialized_item, "Result should match item in the database"
        )

        result = json.loads(json.dumps(result))
        result_copy = result.copy()
        for key in result_copy:
            if key not in data:
                result.pop(key)

        self.assert_equal(result, data, "Result should match request data")

    def test_destroy(self):
        response = self.api_client.delete(f"{self.endpoint}1")
        self.assert_equal(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            "Status code should be 204. " f"Error: {response.data}",
        )

        item = self.model_class.objects.filter(id=1)
        self.assert_equal(len(item), 0, "Item should be removed from the database")


class AbstractSavedTestCase:
    # Any tests that inherit this class must also inherit AbstractAPITestCase
    save_options = None
    endpoint = None
    api_client = None

    def test_save(self):
        for option in self.save_options:
            # test save
            data = {"save": True, "id": 1}
            response = self.api_client.post(f"{self.endpoint}{option}", data)
            self.assert_equal(
                response.status_code,
                status.HTTP_200_OK,
                "Status code should be 200. " f"Error: {response.data}",
            )

            # test get save
            response = self.api_client.get(f"{self.endpoint}{option}")
            self.assert_equal(
                response.status_code,
                status.HTTP_200_OK,
                "Status code should be 200. " f"Error: {response.data}{option}",
            )
            results = response.data["results"]

            item = self.model_class.objects.filter(id=1)
            # serialized_item = self.serializer_class(item).data
            self.assert_equal(
                len(results), len(item), f"There should be {len(item)} results"
            )
            # self.assert_list_equal(
            #     results,
            #     list(serialized_item),
            #     "Results should match items in the database",
            # )

            # test remove saved
            data = {"save": False, "id": 1}
            response = self.api_client.post(f"{self.endpoint}{option}", data)
            self.assert_equal(
                response.status_code,
                status.HTTP_200_OK,
                "Status code should be 200. " f"Error: {response.data}",
            )


class AbstractLikesTestCase:
    api_client = None
    assert_equal = None
    assert_list_equal = None
    endpoint = None
    model_class = None
    detail_serializer_class = None
    factory_class = None
    factory_kwargs = None

    def setUp(self):
        user = UserFactory(connected_users=[], blocked_users=[])
        item = self.factory_class(creator=user, **self.factory_kwargs)
        self.api_client.login(email=user.email, password="Top$ecret150")

    def test_liked_users(self):
        response = self.api_client.get(self.endpoint)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )

        results = response.data["results"]
        item = self.model_class.objects.get(id=1)
        liked_users = item.liked_users.all()
        self.assert_equal(
            len(results),
            len(liked_users),
            f"There should be {len(liked_users)} results",
        )

        context = {"request": SimpleNamespace(user=item.creator)}
        serialized_items = self.detail_serializer_class(
            liked_users, context=context, many=True
        ).data
        self.assert_list_equal(
            results, serialized_items, "Results should match items in the database"
        )
