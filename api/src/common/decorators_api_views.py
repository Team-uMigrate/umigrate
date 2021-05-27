from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# Applies swagger_auto_schema decorator to all methods in a model view set class
def model_view_set_swagger_decorator(tags):
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
