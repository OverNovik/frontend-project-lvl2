#Makefile

install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

link:
	npm link

test:
	npx jest

test-coverage:
	make npx jest --coverage