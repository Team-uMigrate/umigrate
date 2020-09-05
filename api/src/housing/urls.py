from django.urls import path
from .api_views import HousingListCreate, HousingRetrieveUpdateDestroy, HousingCommentListCreate, \
    HousingCommentRetrieveUpdateDestroy, HousingLike, HousingCommentLike

# Housing posts url patterns
urlpatterns = [
    path('', HousingListCreate.as_view()),
    path('<int:id>', HousingRetrieveUpdateDestroy.as_view()),
    path('<int:id>/comments/', HousingCommentListCreate.as_view()),
    path('comments/<int:id>', HousingCommentRetrieveUpdateDestroy.as_view()),
    path('<int:id>/like', HousingLike.as_view()),
    path('comments/<int:id>/like', HousingCommentLike.as_view()),
]
