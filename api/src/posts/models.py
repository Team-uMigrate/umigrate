from common.abstract_models import AbstractPostModel
from common.model_extensions import PhotoCollectionExtension


class Post(AbstractPostModel, PhotoCollectionExtension):
    """
    A model class that represents a post.
    """

    pass
