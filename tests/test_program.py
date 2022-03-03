import json
import logging
import os
from pathlib import Path

from pytest import mark
from anchorpy import Program, Provider, Wallet, Context, Idl
from solana.keypair import Keypair
from solana.rpc.async_api import AsyncClient
from solana.publickey import PublicKey
from solana.system_program import SYS_PROGRAM_ID

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
NETWORK_URL = os.getenv("NETWORK_URL")
PROGRAM_ID = os.getenv("PROGRAM_ID")


@mark.asyncio
async def test_ncounter_program():
    # Create and set the provider
    client = AsyncClient(NETWORK_URL)
    provider = Provider(client, Wallet.local())

    # Load program Idl
    idl_file = open(BASE_DIR / "programs/ncounter/idl.json")
    idl_dict = json.loads(idl_file.read())
    idl = Idl.from_json(idl_dict)

    # Get program
    program_id = PublicKey(PROGRAM_ID)
    program = Program(idl, program_id, provider)

    # Create an account keypair for our program to use.
    base_account = Keypair()

    # Create account
    transaction = await program.rpc["create_account"](ctx=Context(
        accounts={
          "base_account": base_account.public_key,
          "user": provider.wallet.public_key,
          "system_program": SYS_PROGRAM_ID,
        },
        signers=[base_account]
    ))
    logger.info(f"Your transaction signature {transaction}")
    assert transaction

    # Get initial account state
    account = await program.account["base_account"].fetch(base_account.public_key)
    logger.info(f"Images count {account.total_images}")
    assert not account.total_images

    # Update account
    await program.rpc["update_account"](
        ctx=Context(accounts={"base_account": base_account.public_key})
    )
    account = await program.account["base_account"].fetch(base_account.public_key)
    logger.info(f"Images count {account.total_images}")
    assert account.total_images

    await program.close()
