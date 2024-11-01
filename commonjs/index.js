"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifierDigit = verifierDigit;
exports.strip = strip;
exports.format = format;
exports.isValid = isValid;
exports.generate = generate;
// Reject common values.
var REJECT_LIST = [
    "00000000000000",
    "11111111111111",
    "22222222222222",
    "33333333333333",
    "44444444444444",
    "55555555555555",
    "66666666666666",
    "77777777777777",
    "88888888888888",
    "99999999999999",
];
var STRICT_STRIP_REGEX = /[-\/.]/g;
var LOOSE_STRIP_REGEX = /[^A-Z\d]/g;
var CHARS = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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
    var reverse = numbers.reduce(function (buffer, number) { return [number].concat(buffer); }, []);
    var sum = reverse.reduce(function (buffer, number) {
        buffer += number * index;
        index = index === 9 ? 2 : index + 1;
        return buffer;
    }, 0);
    var mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
}
/**
 * Remove some characters from the input.
 *
 * Example:
 * ```
 * strip('54550[752#0001..$55'); // Result: '54550752000155'
 * strip('54550[752#0001..$55', true); // Result: '54550[752#0001..$55' - Attention!
 * ```
 *
 * @export
 * @param {string} cnpj the CNPJ text.
 * @param {boolean} [isStrict] if `true`, it will remove only `.` and `-` characters.
 *                             Otherwise, it will remove all non-digit (`[^A-Z\d]`) characters. Optional.
 * @returns {string} the stripped CNPJ.
 */
function strip(cnpj, isStrict) {
    if (isStrict === void 0) { isStrict = false; }
    var regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (cnpj || "").toString().toUpperCase().replace(regex, "");
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
    return strip(cnpj.toUpperCase()).replace(/^([A-Z\d]{2})([A-Z\d]{3})([A-Z\d]{3})([A-Z\d]{4})(\d{2})$/, "$1.$2.$3/$4-$5");
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
    if (isStrict === void 0) { isStrict = false; }
    var stripped = strip(cnpj, isStrict);
    // CNPJ must be defined
    if (!stripped) {
        return false;
    }
    // CNPJ must have 14 chars
    if (stripped.length !== 14) {
        return false;
    }
    if (REJECT_LIST.includes(stripped)) {
        return false;
    }
    var digits = stripped.substr(0, 12).split("");
    var numbers = digits.map(function (digit) { return digit.charCodeAt(0) - 48; });
    numbers.push(verifierDigit(numbers));
    numbers.push(verifierDigit(numbers));
    return numbers.slice(12).join("") === stripped.substr(-2);
}
/**
 * Generate a random CNPJ.
 *
 * @export
 * @param {boolean} [useFormat] if `true`, it will format using `.` and `-`. Optional.
 * @returns {string} the CNPJ.
 */
function generate(useFormat) {
    if (useFormat === void 0) { useFormat = false; }
    var digits = [];
    for (var i = 0; i < 12; i += 1) {
        digits.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
    var numbers = digits.map(function (digit) { return digit.charCodeAt(0) - 48; });
    numbers.push(verifierDigit(numbers));
    numbers.push(verifierDigit(numbers));
    var cnpj = digits.concat(numbers.slice(12)).join("");
    return useFormat ? format(cnpj) : cnpj;
}
