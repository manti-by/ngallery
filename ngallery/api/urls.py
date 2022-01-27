from django.urls import path

from .images import ImageViewSet
from .wallets import WalletViewSet

urlpatterns = [
    path("images/", ImageViewSet.as_view(), name="images"),
    path("wallets/", WalletViewSet.as_view(), name="wallets"),
]
