var cnpj =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cnpj.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cnpj.js":
/*!*********************!*\
  !*** ./src/cnpj.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifierDigit = verifierDigit;
exports.format = format;
exports.strip = strip;
exports.isValid = isValid;
exports.generate = generate;
// Blacklist common values.
var BLACKLIST = ["00000000000000", "11111111111111", "22222222222222", "33333333333333", "44444444444444", "55555555555555", "66666666666666", "77777777777777", "88888888888888", "99999999999999"];

var STRICT_STRIP_REGEX = /[-\/.]/g;
var LOOSE_STRIP_REGEX = /[^\d]/g;

/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in portuguese) for CNPJ.
 *
 * You can learn more about this on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers the CNPJ string with only numbers.
 * @returns {number} the verifier digit.
 */
function verifierDigit(numbers) {
  var index = 2;
  var reverse = numbers.split("").reduce(function (buffer, number) {
    return [parseInt(number, 10)].concat(buffer);
  }, []);

  var sum = reverse.reduce(function (buffer, number) {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  var mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

/**
 * Transform the input into a pretty CNPJ format.
 *
 * Example:
 * ```
 * format('54550752000155');
 * // Result: '54.550.752/0001-55'
 * ```
 *
 * @export
 * @param {string} cnpj the CNPJ.
 * @returns {string} the formatted CNPJ.
 */
function format(cnpj) {
  return strip(cnpj).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

/**
 * Remove some characters from the input.
 *
 * Example:
 * ```
 * strip('54550[752#0001..$55'); // Result: '54550752000155'
 * strip('54550[752#0001..$55', true); // Result: '54550[752#0001..$55' - Atention!
 * ```
 *
 * @export
 * @param {string} cnpj the CNPJ text.
 * @param {boolean} [isStrict] if `true`, it will remove only `.` and `-` characters.
 *                             Otherwise, it will remove all non-digit (`[^\d]`) characters. Optional.
 * @returns {string} the stripped CNPJ.
 */
function strip(cnpj, isStrict) {
  var regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (cnpj || "").toString().replace(regex, "");
}

/**
 * Validate the CNPJ.
 *
 * @export
 * @param {string} cnpj the CNPJ number.
 * @param {boolean} [isStrict] if `true`, it will accept only `digits`, `.` and `-` characters. Optional.
 * @returns {boolean} `true` if CNPJ is valid. Otherwise, `false`.
 */
function isValid(cnpj, isStrict) {
  var stripped = strip(cnpj, isStrict);

  // CNPJ must be defined
  if (!stripped) {
    return false;
  }

  // CNPJ must have 14 chars
  if (stripped.length !== 14) {
    return false;
  }

  // CNPJ can't be blacklisted
  if (BLACKLIST.includes(stripped)) {
    return false;
  }

  var numbers = stripped.substr(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substr(-2) === stripped.substr(-2);
}

/**
 * Generate a random CNPJ.
 *
 * @export
 * @param {boolean} [useFormat] if `true`, it will format using `.` and `-`. Optional.
 * @returns {string} the CNPJ.
 */
function generate(useFormat) {
  var numbers = "";

  for (var i = 0; i < 12; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return useFormat ? format(numbers) : numbers;
}

/***/ })

/******/ });
//# sourceMappingURL=cnpj.js.map