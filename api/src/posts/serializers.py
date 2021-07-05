from common.abstract_serializers import (
    AbstractPostSerializer,
    AbstractPostDetailSerializer,
)
from .models import Post


class PostSerializer(AbstractPostSerializer):
    """
    A serializer class for the Post model.
    """

    class Meta:
        model = Post
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class PostDetailSerializer(PostSerializer, AbstractPostDetailSerializer):
    """
    A detailed serializer class for the Post model.
    """

    pass
