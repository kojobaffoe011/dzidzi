import PropTypes from "prop-types";
import { classNames } from "../utils/classNames";

/**
 * The `Button` component represents a customizable button element with various styles.
 *
 * @param {Object} props - React props for configuring the button.
 * @param {String} props.className - Additional CSS classes to apply to the button.
 * @param {ReactNode} props.children - The content to display within the button.
 * @param {Boolean} props.rounded - Indicates whether the button should have rounded corners.
 * @param {String} props.variant - Specifies the button's visual style (e.g., "primary", "success").
 * @param {String} props.color - Specifies the color of the button (e.g., "blue").
 * @param {...any} props - Additional HTML attributes to apply to the button element.
 * @returns {JSX.Element} The rendered button element.
 */
const Button = ({ className, children, rounded, variant, ...props }) => (
  <button
    className={classNames(
      "cursor-pointer select-none [outline:none] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-100 disabled:shadow-inner",
      rounded ? "rounded-md" : "",
      variant === "primary" ? "bg-[#0d1655] text-white font-bold" : "",
      variant === "secondary"
        ? "bg-[#E2A927] hover:bg-[#F0D493] text-white font-bold"
        : "",
      variant === "success"
        ? "bg-green-600 hover:bg-green-400 text-white font-bold"
        : "",
      variant === "danger"
        ? "bg-red-600 hover:bg-red-400 text-white font-bold"
        : "",
      variant === "warning" ? "" : "",
      variant === "info" ? "" : "",
      variant === "light" ? "bg-white hover:bg-gray-400 font-bold" : "",
      variant === "dark"
        ? "bg-gray-600 hover:bg-gray-400 text-white font-bold"
        : "",
      variant === "primary-outline"
        ? "border border-[#0d1655] text-[#0d1655] hover:text-white hover:bg-[#0d1655] font-bold"
        : "",
      variant === "secondary-outline"
        ? "border border-[#E2A927] text-[#E2A927] hover:text-white hover:bg-[#F0D493] font-bold"
        : "",
      variant === "success-outline"
        ? "border border-green-600 text-green-600 hover:text-white hover:bg-green-400 font-bold"
        : "",
      variant === "danger-outline"
        ? "border border-red-600 text-red-600 hover:text-white hover:bg-red-400 font-bold"
        : "",
      variant === "warning-outline" ? "" : "",
      variant === "info-outline" ? "" : "",
      variant === "light-outline" ? "" : "",
      variant === "info-outline" ? "" : "",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;

// PropTypes definitions for type checking
Button.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.node.isRequired,
  rounded: PropTypes.bool,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "primary-outline",
    "secondary-outline",
    "success-outline",
    "danger-outline",
    "warning-outline",
    "info-outline",
    "light-outline",
    "dark-outline",
  ]),
};
