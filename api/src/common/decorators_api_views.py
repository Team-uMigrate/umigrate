from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema

# Common 6 swagger_auto_schema decorators applied to all model view set classes
def viewsets_swagger_decorator(tagList):
    @method_decorator(name="list", decorator=swagger_auto_schema(tags=tagList))
    @method_decorator(name="create", decorator=swagger_auto_schema(tags=tagList))
    @method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=tagList))
    @method_decorator(name="update", decorator=swagger_auto_schema(tags=tagList))
    @method_decorator(
        name="partial_update", decorator=swagger_auto_schema(tags=tagList)
    )
    @method_decorator(name="destroy", decorator=swagger_auto_schema(tags=tagList))
    def wrapper(Cls):
        return Cls

    return wrapper
