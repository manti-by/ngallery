from rest_framework import serializers
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from ngallery.images.models import Image


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ("source", "created_at")


class ImageViewSet(APIView):
    renderer_classes = [JSONRenderer, TemplateHTMLRenderer]
    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        images = Image.objects.all()
        if request.GET.get("format", "json") == "html":
            return Response({"images": images}, template_name="images.html")
        return Response(ImageSerializer(images, many=True).data)
