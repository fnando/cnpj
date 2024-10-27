// Reject common values.
const REJECT_LIST = [
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
const STRICT_STRIP_REGEX = /[-\/.]/g;
const LOOSE_STRIP_REGEX = /[^A-Z\d]/g;
const CHARS = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in portuguese) for CNPJ.
 *
 * You can learn more about this on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers the CNPJ string with only numbers.
 * @returns {number} the verifier digit.
 */
export function verifierDigit(numbers) {
    let index = 2;
    const reverse = numbers.reduce((buffer, number) => [number].concat(buffer), []);
    const sum = reverse.reduce((buffer, number) => {
        buffer += number * index;
        index = index === 9 ? 2 : index + 1;
        return buffer;
    }, 0);
    const mod = sum % 11;
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
export function strip(cnpj, isStrict = false) {
    const regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
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
export function format(cnpj) {
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
export function isValid(cnpj, isStrict = false) {
    const stripped = strip(cnpj, isStrict);
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
    let digits = stripped.substr(0, 12).split("");
    let numbers = digits.map((digit) => digit.charCodeAt(0) - 48);
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
export function generate(useFormat = false) {
    let digits = [];
    for (let i = 0; i < 12; i += 1) {
        digits.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
    let numbers = digits.map((digit) => digit.charCodeAt(0) - 48);
    numbers.push(verifierDigit(numbers));
    numbers.push(verifierDigit(numbers));
    let cnpj = digits.concat(numbers.slice(12)).join("");
    return useFormat ? format(cnpj) : cnpj;
}
