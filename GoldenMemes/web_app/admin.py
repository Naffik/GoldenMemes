from django.contrib import admin
from .models import Post, Comment
# Register your models here.


class CommentInLine(admin.StackedInline):
    model = Comment


# admin.site.register(Post)
# admin.site.register(Comment)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'post_author', 'title', 'status']
    list_filter = ['date', 'status']
    search_fields = ['title']
    inlines = [
        CommentInLine
    ]


@admin.register(Comment)
class Comment(admin.ModelAdmin):
    list_display = ['id', 'comment_author', 'post', 'content']
    list_filter = ['post']
