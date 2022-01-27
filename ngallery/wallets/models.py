from django.db import models
from django.utils.translation import gettext_lazy as _

from ngallery.core.models import BaseModel


class Wallet(BaseModel):

    public_key = models.CharField(max_length=255, verbose_name=_("Public key"))

    def __str__(self):
        return f"Wallet #{self.id}"

    class Meta:
        verbose_name = _("Wallet")
        verbose_name_plural = _("Wallets")
