from django.shortcuts import render

from ngallery.images.models import Image


def index_view(request):
    images = Image.objects.all()
    return render(request, "index.html", {"images": images})
