from django.db import models
from common.abstract_models import AbstractPostModel
from common.generics.generic_models import GenericPhotoCollection


# Represents a post object
class Post(AbstractPostModel, GenericPhotoCollection):
    pass
