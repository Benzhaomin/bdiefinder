# B-Die Finder

Find Samsung B-Die DDR 4 memory kits on Amazon, Newegg and many more.

https://benzhaomin.github.io/bdiefinder/

## Contributing

Run `make` to bootstrap your env, then `make dev` to run the dev server.

To add SKUs or search engines please submit a pull request against [data.js](src/js/data.js)

## Updating SKUs

Run `make update` to compare the current list to the one published on [hardwareluxx.de](https://www.hardwareluxx.de/community/threads/die-ultimative-hardwareluxx-samsung-8gb-b-die-liste-alle-hersteller-31-08-20.1161530/).

Add and remove them in [data.js](src/js/data.js), run `make test` and update [parsers](src/js/parsers.js) when required.
