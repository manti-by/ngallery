check:
	flake8 ngallery/
	black --target-version py39 ngallery/

django-checks:
	python manage.py makemigrations --dry-run --check --verbosity=3

test:
	pytest -n 4
