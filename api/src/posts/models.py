from common.abstract_models import AbstractPostModel
from common.model_extensions import PhotoCollectionExtension


# Represents a post object
class Post(AbstractPostModel, PhotoCollectionExtension):
    pass
