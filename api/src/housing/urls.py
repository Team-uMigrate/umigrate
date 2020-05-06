from django.urls import path
from .api_views import HousingListCreate, HousingRetrieveUpdateDestroy, HousingCommentListCreate, HousingCommentRetrieveUpdateDestroy


# Posts url patterns
urlpatterns = [
    path('housing/', HousingListCreate.as_view()),
    path('housing/<int:id>', HousingRetrieveUpdateDestroy.as_view()),
    path('housing/<int:id>/comments/', HousingCommentListCreate.as_view()),
    path('housing/comments/<int:id>', HousingCommentRetrieveUpdateDestroy.as_view()),
]
