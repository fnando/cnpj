/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in portuguese) for CNPJ.
 *
 * You can learn more about this on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers the CNPJ string with only numbers.
 * @returns {number} the verifier digit.
 */
export declare function verifierDigit(numbers: number[]): number;
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
export declare function strip(cnpj: string, isStrict?: boolean): string;
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
export declare function format(cnpj: string): string;
/**
 * Validate the CNPJ.
 *
 * @export
 * @param {string} cnpj the CNPJ number.
 * @param {boolean} [isStrict] if `true`, it will accept only `digits`, `.` and `-` characters. Optional.
 * @returns {boolean} `true` if CNPJ is valid. Otherwise, `false`.
 */
export declare function isValid(cnpj: string, isStrict?: boolean): boolean;
/**
 * Generate a random CNPJ.
 *
 * @export
 * @param {boolean} [useFormat] if `true`, it will format using `.` and `-`. Optional.
 * @returns {string} the CNPJ.
 */
export declare function generate(useFormat?: boolean): string;
