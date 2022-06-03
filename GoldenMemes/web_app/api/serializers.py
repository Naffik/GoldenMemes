from web_app.models import Post, Comment
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    comment_author = serializers.StringRelatedField(read_only=True)
    post = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        # exclude = ('post',)
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    post_author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
