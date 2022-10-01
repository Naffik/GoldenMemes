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
    likes = serializers.SerializerMethodField(read_only=True)
    dis_likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        # exclude = ('number_of_comments',)
        # fields = "__all__"
        fields = ['id', 'tags', 'post_author', 'title', 'slug', 'created', 'image', 'status', 'favourites',
                  'likes', 'dis_likes']

    def get_likes(self, instance):
        return instance.get_total_like()

    def get_dis_likes(self, instance):
        return instance.get_total_dis_like()


class PostCreateSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    post_author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Post
        exclude = ('number_of_comments',)


class PostFavSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        exclude = ('status', 'favourites', 'number_of_comments', )
