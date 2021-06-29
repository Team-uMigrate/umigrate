from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


def model_view_set_swagger_decorator(tags):
    """
    A decorator that applies the swagger_auto_schema decorator to all methods in a model view set class.
    """

    def wrapper(obj):
        for name in [
            "list",
            "create",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            method_decorator(name=name, decorator=swagger_auto_schema(tags=tags))(obj)

        return obj

    return wrapper


def api_view_swagger_decorator(tags):
    """
    A decorator that applies the swagger_auto_schema decorator to get and post methods in an API view class.
    """

    def wrapper(obj):
        for name in [
            "get",
            "post",
        ]:
            method_decorator(name=name, decorator=swagger_auto_schema(tags=tags))(obj)

        return obj

    return wrapper
