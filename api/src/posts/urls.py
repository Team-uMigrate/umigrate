from django.urls import path
from .api_views import PostListCreate, PostRetrieveUpdateDestroy, PostLike

# Posts url patterns
urlpatterns = [
    path('', PostListCreate.as_view()),
    path('<int:id>', PostRetrieveUpdateDestroy.as_view()),
    path('like', PostLike.as_view()),
]
