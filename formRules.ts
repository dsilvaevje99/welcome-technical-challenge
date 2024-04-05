import type { InputRules } from "~/types";

export const requiredRule: InputRules = [
  (val) => !!val || "This field is required.",
];

export const numberRule: InputRules = [
  (val) => !isNaN(val as number) || "This value has to be a number.",
];

const yearRegex = new RegExp(/^\d{4}$/);
export const yearRule: InputRules = [
  (val) => yearRegex.test(val.toString()) || "The year provided is not valid.",
];

const isbnRegex = new RegExp(/^\d{13}$/);
export const isbnRule: InputRules = [
  (val) => isbnRegex.test(val.toString()) || "The ISBN provided is not valid.",
];

const urlRegex = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
);
export const urlRule: InputRules = [
  (val) =>
    !val || urlRegex.test(val.toString()) || "The URL provided is not valid.",
];
