from common.abstract_serializers import (
    ModelSerializerExtension,
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Poll, Option, Vote


class VoteSerializer(ModelSerializerExtension):
    """
    A serializer class for the Vote model.
    """

    class Meta:
        model = Vote
        fields = "__all__"

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return ModelSerializerExtension.create(self, validated_data)


class OptionSerializer(ModelSerializerExtension):
    """
    A serializer class for the option model.
    """

    vote_set = VoteSerializer(read_only=True, many=True)

    class Meta:
        model = Option
        fields = "__all__"
        extra_fields = [
            "votes",
        ]

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return ModelSerializerExtension.create(self, validated_data)


class PollSerializer(AbstractModelSerializer):
    """
    A serializer class for the Poll model.
    """

    option_set = OptionSerializer(read_only=True, many=True)

    class Meta:
        model = Poll
        fields = "__all__"
        extra_fields = [
            "options",
        ]
        exclude_fields = ["saved_users", "liked_users"]


class PollDetailSerializer(PollSerializer, AbstractModelDetailSerializer):
    """
    A detailed serializer class for the Poll model.
    """

    pass
