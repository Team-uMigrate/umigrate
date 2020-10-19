from django.db import models
from common.generics.generic_models import GenericPhotoCollection
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel


# Represents a post object
class Post(GenericPostModel, GenericPhotoCollection):
    pass
