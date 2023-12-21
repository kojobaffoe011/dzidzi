/**
 * The `classNames` utility function combines a list of CSS class names into a single string.
 * It filters out falsy values (e.g., undefined, null, empty strings) from the input list
 * and joins the remaining class names with spaces.
 *
 * @param {...String} classes - One or more CSS class names to be combined.
 * @returns {String} A single string containing the concatenated CSS class names.
 */

export const classNames = (...classes) => classes.filter(Boolean).join(" ");
