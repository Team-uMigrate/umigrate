from common.generics.generic_post_serializers import GenericSerializer, GenericPostSerializer, GenericCommentSerializer, \
    GenericPostDetailSerializer, GenericCommentDetailSerializer
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


# Serializes the poll model
class PollSerializer(GenericPostSerializer):
    option_set = OptionSerializer(read_only=True, many=True)

    class Meta:
        model = Poll
        fields = '__all__'
        extra_fields = [
            'option_set',
        ]


# Serialize the poll model with detail
class PollDetailSerializer(PollSerializer, GenericPostDetailSerializer):
    pass


# Serializes the poll comment model
class PollCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = PollComment
        fields = '__all__'


# Serialize the poll comment model with detail
class PollCommentDetailSerializer(PollCommentSerializer, GenericCommentDetailSerializer):
    pass
