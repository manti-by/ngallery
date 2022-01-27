from django.db import models
from django.utils.translation import gettext_lazy as _

from ngallery.core.models import BaseModel


class Image(BaseModel):

    source = models.ImageField(verbose_name=_("Image"))

    def __str__(self):
        return f"Image #{self.id}"

    class Meta:
        verbose_name = _("Image")
        verbose_name_plural = _("Images")
