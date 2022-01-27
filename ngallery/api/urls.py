from rest_framework import routers

from .images import ImageViewSet

api_router = routers.DefaultRouter()
api_router.register(r"images", ImageViewSet)
