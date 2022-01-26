check:
	flake8 app/
	black --target-version py39 app/

django-checks:
	python manage.py makemigrations --dry-run --check --verbosity=3

test:
	pytest -n 4
