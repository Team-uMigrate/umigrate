from rest_framework import status
from users.models import CustomUser


# An abstract test case for generic resource API views
class GenericPostTestCase:
    # Override required for api_client; it should be an api_client instance
    api_client = None
    # Override required for assert_equal; it should be a function
    assert_equal = None
    # Override required for resource_name; it should be a string (e.g. posts)
    resource_name = None
    # Override required for model; it should be a model class
    model = None
    # Override required for create_resource; it should be a function that creates the resources for testing
    create_resource = None
    # Override required for create_parent; it should be a function that creates the parent resources for testing
    create_data = None
    # Override required for update_data; it should be a dictionary that represents the JSON data to update a resource
    update_data = None
    user = None
    ignored_keys = [
        'option_set',
        'photo',
        'liked_users',
        'tagged_users',
        'interested_users',
        'attending_users',
        'is_liked',
        'is_interested',
        'is_attending',
        'members',
        'likes',
        'comments',
        'interested',
        'attending',
        'most_liked_comment',
        'saved_users',
        'is_saved'
    ]

    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test0@uwaterloo.ca', password='Top$ecret150')
        CustomUser.objects.create_user(email='test1@uwaterloo.ca', password='Top$ecret150')
        self.api_client.login(email='test0@uwaterloo.ca', password='Top$ecret150')
        self.create_resource(3)

    def test_list(self):
        response = self.api_client.get(f'/api/{self.resource_name}/')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_list = response.data['results']
        resource_list = self.model.objects.all()
        self.assert_equal(len(response_list), len(resource_list))

    def test_create(self):
        response = self.api_client.post(f'/api/{self.resource_name}/', self.create_data, format='json')
        self.assert_equal(response.status_code, status.HTTP_201_CREATED)

        response_dict = dict(response.data)
        for key in self.create_data:
            if key in self.ignored_keys:
                continue
            elif key == 'price':
                self.assert_equal(float(self.create_data[key]), float(response_dict[key]))
            else:
                self.assert_equal(self.create_data[key], response_dict[key])

    def test_retrieve(self):
        response = self.api_client.get(f'/api/{self.resource_name}/1')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        obj = self.model.objects.get(id=1).__dict__
        obj['datetime_created'] = obj['datetime_created'].strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        obj['creator'] = obj['creator_id']
        for key in response_dict:
            if key in self.ignored_keys:
                continue
            elif key == 'creator':
                self.assert_equal(obj[key], response_dict[key]['id'])
            elif key == 'price':
                self.assert_equal(float(obj[key]), float(response_dict[key]))
            elif key == 'start_datetime' or key == 'end_datetime':
                self.assert_equal(obj[key].strftime('%Y-%m-%dT%H:%M:%S.%fZ'), response_dict[key])
            else:
                self.assert_equal(obj[key], response_dict[key])

    def test_update(self):
        response = self.api_client.put(f'/api/{self.resource_name}/1', self.update_data, format='json')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        for key in self.update_data:
            if key in self.ignored_keys:
                continue
            elif key == 'price':
                self.assert_equal(float(self.update_data[key]), float(response_dict[key]))
            else:
                self.assert_equal(self.update_data[key], response_dict[key])

    def test_update_partial(self):
        response = self.api_client.patch(f'/api/{self.resource_name}/1', self.update_data, format='json')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        for key in self.update_data:
            if key in self.ignored_keys:
                continue
            elif key == 'price':
                self.assert_equal(float(self.update_data[key]), float(response_dict[key]))
            else:
                self.assert_equal(self.update_data[key], response_dict[key])

    def test_destroy(self):
        response = self.api_client.delete(f'/api/{self.resource_name}/1')
        self.assert_equal(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_like(self):
        like_data = {
            'like': True,
            'id': 1
        }

        like_response = self.api_client.post(f'/api/{self.resource_name}/like', like_data, format='json')
        self.assert_equal(like_response.status_code, status.HTTP_200_OK)
        self.assert_equal(like_response.data, like_data)
        self.assert_equal(len(self.model.objects.get(id=1).liked_users.filter(id=1)), 1)

        obj = self.model.objects.get(id=2)
        obj.liked_users.add(1)

        unlike_data = {
            'like': False,
            'id': 2
        }

        unlike_response = self.api_client.post(f'/api/{self.resource_name}/like', unlike_data, format='json')
        self.assert_equal(unlike_response.status_code, status.HTTP_200_OK)
        self.assert_equal(unlike_response.data, unlike_data)
        self.assert_equal(len(self.model.objects.get(id=2).liked_users.filter(id=1)), 0)


# An abstract test case for generic comment API views
class GenericCommentTestCase:
    # Override required for api_client; it should be an api_client instance
    api_client = None
    # Override required for assert_equal; it should be a function
    assert_equal = None
    # Override required for resource_name; it should be a string (e.g. posts)
    resource_name = None
    # Override required for parent_name; it should be a string (e.g. post)
    parent_name = None
    # Override required for model; it should be a model class
    model = None
    # Override required for create_resource; it should be a function that creates the resources for testing
    create_resource = None
    # Override required for create_parent; it should be a function that creates the parent resources for testing
    create_parent = None
    user = None
    ignored_keys = [
        'liked_users',
        'tagged_users',
        'is_liked',
        'likes',
        'saved_users',
        'is_saved'
    ]

    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test0@uwaterloo.ca', password='Top$ecret150')
        self.api_client.login(email='test0@uwaterloo.ca', password='Top$ecret150')
        self.create_parent(1)
        self.create_resource(3)

    def test_list(self):
        response = self.api_client.get(f'/api/{self.resource_name}/comments/')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_list = response.data['results']
        resource_list = self.model.objects.all()
        self.assert_equal(len(response_list), len(resource_list))

    def test_create(self):
        data = {
            'content': 'My comment',
            self.parent_name: 1
        }

        response = self.api_client.post(f'/api/{self.resource_name}/comments/', data, format='json')
        self.assert_equal(response.status_code, status.HTTP_201_CREATED)
        self.assert_equal(response.data[self.parent_name], 1)

        response_dict = dict(response.data)
        for key in data:
            if key in self.ignored_keys:
                continue
            else:
                self.assert_equal(data[key], response_dict[key])

    def test_retrieve(self):
        response = self.api_client.get(f'/api/{self.resource_name}/comments/1')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        obj = self.model.objects.get(id=1).__dict__
        obj['datetime_created'] = obj['datetime_created'].strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        obj['creator'] = obj['creator_id']
        obj[self.parent_name] = obj[f'{self.parent_name}_id']
        for key in response_dict:
            if key in self.ignored_keys:
                continue
            elif key == 'creator':
                self.assert_equal(obj[key], response_dict[key]['id'])
            else:
                self.assert_equal(obj[key], response_dict[key])

    def test_update(self):
        data = {
            'content': 'My new comment',
            self.parent_name: 1
        }
        response = self.api_client.put(f'/api/{self.resource_name}/comments/1', data, format='json')
        self.assert_equal(response.status_code, status.HTTP_200_OK)
        self.assert_equal(response.data[self.parent_name], 1)

        response_dict = dict(response.data)
        for key in data:
            if key in self.ignored_keys:
                continue
            else:
                self.assert_equal(data[key], response_dict[key])

    def test_update_partial(self):
        data = {
            'content': 'My new comment',
            self.parent_name: 1
        }
        response = self.api_client.patch(f'/api/{self.resource_name}/comments/1', data, format='json')
        self.assert_equal(response.status_code, status.HTTP_200_OK)
        self.assert_equal(response.data[self.parent_name], 1)

        response_dict = dict(response.data)
        for key in data:
            if key in self.ignored_keys:
                continue
            else:
                self.assert_equal(data[key], response_dict[key])

    def test_destroy(self):
        response = self.api_client.delete(f'/api/{self.resource_name}/comments/1')
        self.assert_equal(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_like(self):
        like_data = {
            'like': True,
            'id': 1
        }

        like_response = self.api_client.post(f'/api/{self.resource_name}/comments/like', like_data, format='json')
        self.assert_equal(like_response.status_code, status.HTTP_200_OK)
        self.assert_equal(like_response.data, like_data)
        self.assert_equal(len(self.model.objects.get(id=1).liked_users.filter(id=1)), 1)

        obj = self.model.objects.get(id=2)
        obj.liked_users.add(1)

        unlike_data = {
            'like': False,
            'id': 2
        }

        unlike_response = self.api_client.post(f'/api/{self.resource_name}/comments/like', unlike_data, format='json')
        self.assert_equal(unlike_response.status_code, status.HTTP_200_OK)
        self.assert_equal(unlike_response.data, unlike_data)
        self.assert_equal(len(self.model.objects.get(id=2).liked_users.filter(id=1)), 0)
