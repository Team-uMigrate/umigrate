from django.urls import path
from .api_views import AdListCreate, AdRetrieveUpdateDestroy, AdCommentListCreate, AdCommentRetrieveUpdateDestroy, AdLike, AdCommentLike


# Ads url patterns
urlpatterns = [
    path('ads/', AdListCreate.as_view()),
    path('ads/<int:id>', AdRetrieveUpdateDestroy.as_view()),
    path('ads/<int:id>/comments/', AdCommentListCreate.as_view()),
    path('ads/comments/<int:id>', AdCommentRetrieveUpdateDestroy.as_view()),
    path('ads/<int:id>/like', AdLike.as_view()),
    path('ads/comments/<int:id>/like', AdCommentLike.as_view()),
]
