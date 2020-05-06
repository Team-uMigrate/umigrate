from common.generics.generic_serializers import GenericSerializer
from .models import Poll, PollComment, Option, Vote


# Serializes the vote model
class VoteSerializer(GenericSerializer):

    class Meta:
        model = Vote
        fields = '__all__'


# Serializes the option model
class OptionSerializer(GenericSerializer):
    vote_set = VoteSerializer(read_only=True, many=True)

    class Meta:
        model = Option
        fields = '__all__'
        extra_fields = [
            'vote_set',
        ]
        exclude_fields = [
            'poll',
        ]


# Serializes the poll model
class PollSerializer(GenericSerializer):
    option_set = OptionSerializer(read_only=True, many=True)

    class Meta:
        model = Poll
        fields = '__all__'
        extra_fields = [
            'option_set',
        ]


# Serializes the poll comment model
class PollCommentSerializer(GenericSerializer):

    class Meta:
        model = PollComment
        fields = '__all__'
