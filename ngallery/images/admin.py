from django.contrib import admin

from ngallery.images.models import Image


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):

    list_display = ("id", "source", "created_at")
