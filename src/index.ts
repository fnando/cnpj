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
const LOOSE_STRIP_REGEX = /[^\d]/g;

/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in portuguese) for CNPJ.
 *
 * You can learn more about this on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers the CNPJ string with only numbers.
 * @returns {number} the verifier digit.
 */
export function verifierDigit(numbers: string): number {
  let index = 2;
  const reverse = numbers
    .split("")
    .reduce((buffer, number) => [parseInt(number, 10)].concat(buffer), []);

  const sum = reverse.reduce((buffer, number) => {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod = sum % 11;
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
export function format(cnpj: string): string {
  return strip(cnpj).replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5",
  );
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
 *                             Otherwise, it will remove all non-digit (`[^\d]`) characters. Optional.
 * @returns {string} the stripped CNPJ.
 */
export function strip(cnpj: string, isStrict: boolean = false): string {
  const regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
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
export function isValid(cnpj: string, isStrict: boolean = false): boolean {
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

  let numbers = stripped.substr(0, 12);
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
export function generate(useFormat: boolean = false): string {
  let numbers = "";

  for (let i = 0; i < 12; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return useFormat ? format(numbers) : numbers;
}
