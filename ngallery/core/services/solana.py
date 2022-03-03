from django.conf import settings
from solana.rpc.api import Client

solana_client = Client(settings.SOLANA_NETWORK_URL)
