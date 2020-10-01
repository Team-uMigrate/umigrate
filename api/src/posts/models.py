from django.db import models
from common.generics.generic_models import GenericPhotoCollectionModel
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel


# Represents a post object
class Post(GenericPostModel, GenericPhotoCollectionModel):
    photo = models.ImageField(upload_to='images/post_photos', blank=True)


# Represents a post comment object
class PostComment(GenericCommentModel):
    post = models.ForeignKey(to=Post, related_name='comment_set', on_delete=models.CASCADE)
