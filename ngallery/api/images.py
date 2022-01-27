from rest_framework import serializers
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView

from ngallery.images.models import Image


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ("source", "created_at")


class ImageViewSet(ListModelMixin, APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializer = ImageSerializer(Image.objects.all(), many=True)
        return Response(serializer.data)
