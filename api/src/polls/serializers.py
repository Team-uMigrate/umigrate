from common.abstract_serializers import (
    AbstractPostSerializer,
    AbstractPostDetailSerializer,
    AbstractCreatorSerializer,
)
from .models import Poll, Option, Vote


class VoteSerializer(AbstractCreatorSerializer):
    """
    A serializer class for the Vote model.
    """

    class Meta:
        model = Vote
        fields = "__all__"


class OptionSerializer(AbstractCreatorSerializer):
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


class PollSerializer(AbstractPostSerializer):
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


class PollDetailSerializer(PollSerializer, AbstractPostDetailSerializer):
    """
    A detailed serializer class for the Poll model.
    """

    pass
