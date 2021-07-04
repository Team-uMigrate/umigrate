from typing import List
from model_bakery import baker
from rest_framework.test import APITestCase
from messaging.models import Room
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
        pass

    def test_has_object_permission_false(self):
        pass


class OnDeleteSharedItemTestCase(APITestCase):
    def test_on_delete_shared_item_set_to_none(self):
        pass

    def test_has_object_permission_do_not_set_to_none(self):
        pass
