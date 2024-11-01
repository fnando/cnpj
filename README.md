# CNPJ

[![NPM package version](https://img.shields.io/npm/v/@fnando/cnpj.svg)](https://www.npmjs.com/package/@fnando/cnpj)
![License: MIT](https://img.shields.io/npm/l/@fnando/cnpj.svg)

This package does some [CNPJ](http://en.wikipedia.org/wiki/CNPJ) magic. It
allows you to create, validate and format CNPJ documents.

> [!NOTE]
>
> This library already supports the new alphanumeric CNPJ algorithm that will be
> available starting July 2026. For more information, see
> <https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico>.

**HINT:** Check out the CPF counter part available at
<https://github.com/fnando/cpf>.

## Installation

This lib is available as a NPM package. To install it, use the following
command:

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
const cnpj = require("@fnando/cnpj/commonjs");

// @import
import * as cnpj from "@fnando/cnpj"; // import the whole library
import { isValid as isValidCnpj } from "@fnando/cnpj"; // import just one function

// import via <script>; the lib will available as window.CNPJ
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

On the web, without transformation, just use `web/cnpj.min.js`.

### Strict Validation

By default, validations will strip any characters you provide. This means that
the following is valid, because only numbers will be considered:

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
