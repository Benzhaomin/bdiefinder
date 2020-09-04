.PHONY: update boostrap clean

all: dist

src:

node_modules:
	npm install

dist: node_modules src
	npm run lint
	npm run test
	npm run build

dev: node_modules
	@echo "x-www-browser file://`pwd`/dist/index.html"
	npm run dev

test:
	npm run test

update:
	./update_skus.sh

clean:
	rm -rf dist || true
	rm -rf node_modules || true
	rm -f /tmp/bdiefinder.html || true
