from common.abstract_serializers import GenericSerializer, AbstractModelSerializer,\
    AbstractModelDetailSerializer
from .models import Poll, Option, Vote


# Serializes the vote model
class VoteSerializer(GenericSerializer):

    class Meta:
        model = Vote
        fields = '__all__'

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes the option model
class OptionSerializer(GenericSerializer):
    vote_set = VoteSerializer(read_only=True, many=True)

    class Meta:
        model = Option
        fields = '__all__'
        extra_fields = [
            'vote_set',
        ]

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes the poll model
class PollSerializer(AbstractModelSerializer):
    option_set = OptionSerializer(read_only=True, many=True)

    class Meta:
        model = Poll
        fields = '__all__'
        extra_fields = [
            'option_set',
        ]
        exclude_fields = ['saved_users', 'liked_users']


# Serialize the poll model with detail
class PollDetailSerializer(PollSerializer, AbstractModelDetailSerializer):
    pass
