import * as cnpj from "../src/index";

test("rejects common numbers", () => {
  expect(cnpj.isValid("00000000000000")).toBeFalsy();
  expect(cnpj.isValid("11111111111111")).toBeFalsy();
  expect(cnpj.isValid("22222222222222")).toBeFalsy();
  expect(cnpj.isValid("33333333333333")).toBeFalsy();
  expect(cnpj.isValid("44444444444444")).toBeFalsy();
  expect(cnpj.isValid("55555555555555")).toBeFalsy();
  expect(cnpj.isValid("66666666666666")).toBeFalsy();
  expect(cnpj.isValid("77777777777777")).toBeFalsy();
  expect(cnpj.isValid("88888888888888")).toBeFalsy();
  expect(cnpj.isValid("99999999999999")).toBeFalsy();
});

test("rejects falsy values", () => {
  expect(cnpj.isValid("")).toBeFalsy();
  expect(cnpj.isValid(null)).toBeFalsy();
  expect(cnpj.isValid(undefined)).toBeFalsy();
});

test("validates formatted strings", () => {
  expect(cnpj.isValid("54.550.752/0001-55")).toBeTruthy();
});

test("validates unformatted strings", () => {
  expect(cnpj.isValid("54550752000155")).toBeTruthy();
});

test("validates messed strings", () => {
  expect(cnpj.isValid("54550[752#0001..$55")).toBeTruthy();
});

test("strictly validates strings", () => {
  expect(cnpj.isValid("54550[752#0001..$55", true)).toBeFalsy();
  expect(cnpj.isValid("54.550.752/0001-55", true)).toBeTruthy();
  expect(cnpj.isValid("54550752000155", true)).toBeTruthy();
});

test("returns stripped number", () => {
  const number = cnpj.strip("54550[752#0001..$55");
  expect(number).toEqual("54550752000155");
});

test("returns formatted number", () => {
  const number = cnpj.format("54550752000155");
  expect(number).toEqual("54.550.752/0001-55");
});

test("generates formatted number", () => {
  const number = cnpj.generate(true);

  expect(number).toMatch(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/);
  expect(cnpj.isValid(number)).toBeTruthy();
});

test("generates unformatted number", () => {
  const number = cnpj.generate();

  expect(number).toMatch(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
  expect(cnpj.isValid(number)).toBeTruthy();
});
