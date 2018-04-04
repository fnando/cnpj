# CNPJ

[![Build Status](https://travis-ci.org/fnando/cnpj.svg?branch=master)](https://travis-ci.org/fnando/cnpj)
[![NPM package version](https://img.shields.io/npm/v/@fnando/cnpj.svg)](https://www.npmjs.com/package/@fnando/cnpj)
![License: MIT](https://img.shields.io/npm/l/@fnando/cnpj.svg)
![Minified size](http://img.badgesize.io/fnando/cnpj/master/dist/cnpj.min.js.svg?label=min+size)
![Minified+Gzip size](http://img.badgesize.io/fnando/cnpj/master/dist/cnpj.min.js.svg?compression=gzip&label=min%2Bgzip+size)

This package does some [CNPJ](http://en.wikipedia.org/wiki/CNPJ) magic. It allows you to create, validate and format CNPJ documents.

**HINT:** Check out the CPF counter part available at <https://github.com/fnando/cpf>.

## Installation

This lib is available as a NPM package. To install it, use the following command:

```
npm install @fnando/cnpj --save
```

If you're using Yarn (and you should):

```
yarn add @fnando/cnpj
```

## Usage

```js
// Node.js-specific
const cnpj = require("@fnando/cnpj/dist/node");

// @import
import * as cnpj from "@fnando/cnpj"; // import the whole library
import {isValid as isValidCnpj} from "@fnando/cnpj"; // import just one function

// import via <script>; the lib will available as window.cnpj
// <script src="cnpj.js"></script>

cnpj.isValid("41.381.074/6738-65");
//=> true

cnpj.isValid("41381074673865");
//=> true

cnpj.strip("41.381.074/6738-65");
//=> 41381074673865

cnpj.format("41381074673865");
//=> 41.381.074/6738-65

cnpj.generate(true); // generate formatted number
//=> 54.385.406/3140-07

cnpj.generate(); // generate unformatted number
//=> 07033324230766
```

### Strict Validation

By default, validations will strip any characters you provide. This means that the following is valid, because only numbers will be considered:

```js
cnpj.isValid("41#381#074-----6738\n\n65");
//=> true

cnpj.strip("41#381#074-----6738\n\n65");
//=> 41381074673865
```

If you want to strict validate strings, use the following signature:

```js
cnpj.isValid(number, strict);
```

The same example would now return `false`:

```js
cnpj.isValid("41#381#074-----6738\n\n65", true);
//=> false
```
