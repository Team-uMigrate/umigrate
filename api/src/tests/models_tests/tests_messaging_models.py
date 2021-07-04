from typing import List

from django.http import HttpRequest
from model_bakery import baker
from rest_framework.test import APITestCase
from messaging.models import Room, IsMember
from users.models import CustomUser


class RoomTestCase(APITestCase):
    def test_save_deletes_room(self):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=1)
        room: Room = baker.make("Room", members=users)

        # Act
        room.members.remove(users[0])
        room.save()

        # Assert
        self.assertIsNone(room.id)

    def test_save_does_not_delete_room(self):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=2)
        room: Room = baker.make("Room", members=users)

        # Act
        room.members.remove(users[0])
        room.save()

        # Assert
        self.assertIsNotNone(room.id)


class IsMemberTestCase(APITestCase):
    def test_has_object_permission_true(self):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=1)
        request = HttpRequest()
        request.user = users[0]
        room: Room = baker.make("Room", members=users)
        permission = IsMember()

        # Act
        is_member = permission.has_object_permission(
            request=request, view=None, obj=room
        )

        # Assert
        self.assertTrue(is_member)

    def test_has_object_permission_false(self):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=1)
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        room: Room = baker.make("Room", members=users)
        permission = IsMember()

        # Act
        is_member = permission.has_object_permission(
            request=request, view=None, obj=room
        )

        # Assert
        self.assertFalse(is_member)


class OnDeleteSharedItemTestCase(APITestCase):
    def test_on_delete_shared_item_set_to_none(self):
        pass

    def test_has_object_permission_do_not_set_to_none(self):
        pass
