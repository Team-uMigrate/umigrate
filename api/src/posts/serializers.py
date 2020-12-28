from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Post


# A serializer class for the Post model
class PostSerializer(AbstractModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


# A detailed serializer class for the Post model
class PostDetailSerializer(PostSerializer, AbstractModelDetailSerializer):
    pass
