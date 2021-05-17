from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema

# common decorators applied to all model view set classes
def viewsets(tag):
    print ('tag name is: ' + tag)

    @method_decorator(name="list", decorator=swagger_auto_schema(tags=[tag]))
    @method_decorator(name="create", decorator=swagger_auto_schema(tags=[tag]))
    @method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=[tag]))
    @method_decorator(name="update", decorator=swagger_auto_schema(tags=[tag]))
    @method_decorator(name="partial_update", decorator=swagger_auto_schema(tags=[tag]))
    @method_decorator(name="destroy", decorator=swagger_auto_schema(tags=[tag]))
    def wrapper(Cls):
        print(Cls)
        print(tag)
        return Cls
    return wrapper