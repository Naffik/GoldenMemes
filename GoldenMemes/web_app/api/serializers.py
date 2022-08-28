from web_app.models import Post, Comment
from rest_framework import serializers
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)


class CommentSerializer(serializers.ModelSerializer):
    comment_author = serializers.StringRelatedField(read_only=True)
    post = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        # exclude = ('post',)
        fields = "__all__"


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    # comments = CommentSerializer(many=True, read_only=True)
    tags = TagListSerializerField()
    post_author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Post
        exclude = ('number_of_comments',)
        # fields = "__all__"
