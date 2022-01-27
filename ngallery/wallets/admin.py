from django.contrib import admin

from ngallery.wallets.models import Wallet


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):

    list_display = ("id", "public_key", "created_at")
