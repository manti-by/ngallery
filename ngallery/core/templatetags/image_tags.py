from random import randint

from django import template

register = template.Library()


@register.simple_tag()
def random_id():
    return randint(0, 1000)
