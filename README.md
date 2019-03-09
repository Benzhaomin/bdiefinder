# B-Die Finder

Get search links for Samsung B-Die DDR 4 memory kits on Amazon, Newegg and many more.

https://benzhaomin.github.io/bdiefinder/

# Contributing

To add SKUs or search engines please submit a pull request against [data.js](src/js/data.js)

# Installation

```
npm install
```

or with [nodeenv](https://github.com/ekalinin/nodeenv)

```
python3 -m venv env/python
. env/python/bin/activate
pip install nodeenv
nodeenv env/node
. env/node/bin/activate
npm install
```

# Development

```
npm run dev
```

Get a list of missing SKUs with: `update_skus.sh`

# Tests

```
npm run lint
npm test
```

# Build

```
npm run build
```
