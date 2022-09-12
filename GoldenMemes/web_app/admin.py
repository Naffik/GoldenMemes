from django.contrib import admin
from .models import Post, Comment, Category, Like, DisLike


class CommentInLine(admin.StackedInline):
    model = Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'post_author', 'title', 'status', 'slug']
    list_filter = ['created', 'status']
    search_fields = ['title']
    # inlines = [
    #     CommentInLine
    # ]


@admin.register(Comment)
class Comment(admin.ModelAdmin):
    list_display = ['id', 'comment_author', 'post', 'content']
    list_filter = ['post']


admin.site.register(Category)
admin.site.register(Like)
admin.site.register(DisLike)
