check:
	flake8 ngallery/
	black --target-version py39 ngallery/

django-checks:
	python manage.py makemigrations --dry-run --check --verbosity=3

test:
	pytest -n 4

build-debug:
	cargo build --manifest-path=programs/ncounter/Cargo.toml

build-release:
	cargo build --release --manifest-path=programs/ncounter/Cargo.toml

build:
	cargo build-bpf --manifest-path=programs/ncounter/Cargo.toml

deploy:
	solana program deploy programs/ncounter/target/deploy/ncounter.so

airdrop:
	solana airdrop 1 ${ACCOUNT_ADDRESS}