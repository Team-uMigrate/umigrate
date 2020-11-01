from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Post


# Serializes the post model
class PostSerializer(AbstractModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


# Serializes the post model with detail
class PostDetailSerializer(PostSerializer, AbstractModelDetailSerializer):
    pass
