check:
	flake8 ngallery/
	black --target-version py39 ngallery/

django-checks:
	python manage.py makemigrations --dry-run --check --verbosity=3

test:
	pytest

env:
	set -a; source .env; set +a

build:
	cargo build-bpf --manifest-path=programs/ncounter/Cargo.toml

deploy:
	solana program deploy --program-id programs/ncounter/target/deploy/ncounter-keypair.json programs/ncounter/target/deploy/ncounter.so

program-address:
	solana address -k programs/ncounter/target/deploy/ncounter-keypair.json

close:
	solana program close --buffers --config programs/ncounter/target/deploy/ncounter-keypair.json

airdrop:
	solana airdrop 1 $${ACCOUNT_ADDRESS} --url $${NETWORK_URL}

idl:
	anchor idl parse -f programs/ncounter/src/lib.rs -o programs/ncounter/idl.json

cluster:
	rm -rf test-ledger/validator-*.log
	solana-test-validator --ledger ledger/