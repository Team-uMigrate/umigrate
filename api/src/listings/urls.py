from django.urls import path
from .api_views import ListingListCreate, ListingRetrieveUpdateDestroy, ListingCommentListCreate, \
    ListingCommentRetrieveUpdateDestroy, ListingLike, ListingCommentLike

# Listing listings url patterns
urlpatterns = [
    path('', ListingListCreate.as_view()),
    path('<int:id>', ListingRetrieveUpdateDestroy.as_view()),
    path('<int:id>/comments/', ListingCommentListCreate.as_view()),
    path('comments/<int:id>', ListingCommentRetrieveUpdateDestroy.as_view()),
    path('<int:id>/like', ListingLike.as_view()),
    path('comments/<int:id>/like', ListingCommentLike.as_view()),
]
