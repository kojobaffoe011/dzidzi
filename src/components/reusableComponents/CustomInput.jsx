import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CustomInput = ({
  type,
  placeholder,
  name,
  register,
  label,
  errors,
  required,
  onFocus,
  onBlur,
}) => {
  const [showPass, setShowPass] = useState(false);

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <label className="text-xs font-light text-gray-500">
          {label}
          <span className="text-red-600 text-lg ">*</span>
        </label>
        <input
          {...register(name)}
          className="border outline-none px-4 py-3 text-sm border border-black w-full rounded placeholder:text-xs"
          type={type == "password" ? (showPass ? "text" : "password") : type}
          placeholder={placeholder}
          name={name}
          required={required}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {type == "password" && (
          <div
            className="cursor-pointer absolute right-4 bottom-5"
            onClick={handleTogglePass}
          >
            {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        )}
      </div>
      {errors && errors[name] ? (
        <span className="text-red-600 text-sm mt-3">
          {errors[name].message}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomInput;

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  register: PropTypes.func.isRequired,
  watch: PropTypes.object,
  label: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  isFocused: PropTypes.bool,
};
