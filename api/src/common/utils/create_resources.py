from posts.models import Post, PostComment


# Creates post instance
def create_posts(num):
    for i in range(num):
        post = Post.objects.create(
            title=f'Post {i}',
            description=f'This is Post {i}',
            region=0,
            creator_id=1,
        )
        post.save()


# Creates post comment instance
def create_post_comments(num):
    for i in range(num):
        post_comments = PostComment.objects.create(
            comment_body=f'Comment {i}',
            post_id=1,
            creator_id=1,
        )
        post_comments.save()
