from django import template

register = template.Library()


@register.filter
def modulo(number, divider):
    return number % divider
