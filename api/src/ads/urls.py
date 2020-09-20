from django.urls import path
from .api_views import AdListCreate, AdRetrieveUpdateDestroy, AdCommentListCreate, AdCommentRetrieveUpdateDestroy, AdLike, AdCommentLike


# Ads url patterns
urlpatterns = [
    path('', AdListCreate.as_view()),
    path('<int:id>', AdRetrieveUpdateDestroy.as_view()),
    path('<int:id>/comments/', AdCommentListCreate.as_view()),
    path('comments/<int:id>', AdCommentRetrieveUpdateDestroy.as_view()),
    path('like', AdLike.as_view()),
    path('comments/like', AdCommentLike.as_view()),
]
