from common.abstract_models import AbstractPostModel
from common.model_extensions import PhotoCollectionExtension


# A model class that represents a post
class Post(AbstractPostModel, PhotoCollectionExtension):
    pass
