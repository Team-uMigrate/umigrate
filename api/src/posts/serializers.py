from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Post


class PostSerializer(AbstractModelSerializer):
    """
    A serializer class for the Post model.
    """

    class Meta:
        model = Post
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class PostDetailSerializer(PostSerializer, AbstractModelDetailSerializer):
    """
    A detailed serializer class for the Post model.
    """

    pass
