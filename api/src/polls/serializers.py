from common.abstract_serializers import (
    ModelSerializerExtension,
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Poll, Option, Vote


# A serializer class for the Vote model
class VoteSerializer(ModelSerializerExtension):
    class Meta:
        model = Vote
        fields = "__all__"

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return ModelSerializerExtension.create(self, validated_data)


# A serializer class for the option model
class OptionSerializer(ModelSerializerExtension):
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


# # A serializer class for the Poll model
class PollSerializer(AbstractModelSerializer):
    option_set = OptionSerializer(read_only=True, many=True)

    class Meta:
        model = Poll
        fields = "__all__"
        extra_fields = [
            "options",
        ]
        exclude_fields = ["saved_users", "liked_users"]


# A detailed serializer class for the Poll model
class PollDetailSerializer(PollSerializer, AbstractModelDetailSerializer):
    pass
