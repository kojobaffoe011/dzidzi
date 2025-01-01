import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import Select from "react-select";
import { IoCloseCircle } from "react-icons/io5";

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
  height,
  onChange,
  options,
  onFileSelect,
  onRemoveFile,
}) => {
  const [showPass, setShowPass] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(URL.createObjectURL(file));
    if (file) {
      onFileSelect(file);
    }
  };

  const handleFileRef = () => {
    fileRef.current.click();
  };

  const renderInput = () => {
    if (type == "textarea") {
      return (
        <>
          <textarea
            {...register(name)}
            className={`border outline-none px-4 py-3 text-sm border border-black w-full rounded placeholder:text-xs ${
              height || "h-[300px]"
            }`}
            placeholder={placeholder}
            name={name}
            required={required}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </>
      );
    } else if (type == "select") {
      return <Select options={options} onChange={onChange} />;
    } else if (type == "file") {
      return (
        <div className="flex flex-col">
          <div
            className={`h-[200px] border rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center cursor-pointer bg-cover bg-no-repeat bg-center relative`}
            style={{
              backgroundImage: `url(${file ? file : ""})`,
            }}
            onClick={handleFileRef}
          >
            {file == null && (
              <LuImagePlus size={"60px"} className="text-blue-600" />
            )}
          </div>
          <input
            name={name}
            type="file"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          {file && (
            <div className="flex justify-end mt-2">
              <IoCloseCircle
                size={"30px"}
                className="text-red-600"
                onClick={() => {
                  setFile(null);
                  onRemoveFile();
                }}
              />
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
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
              className="cursor-pointer absolute right-4 bottom-4"
              onClick={handleTogglePass}
            >
              {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex flex-col">
        <label
          className={`text-xs font-light text-gray-500 ${
            required ? "" : "mb-1"
          }`}
        >
          {label}
          {required && <span className="text-red-600 text-lg ">*</span>}
        </label>
        {renderInput()}
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
  height: PropTypes.string,
  register: PropTypes.func.isRequired,
  watch: PropTypes.object,
  label: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  isFocused: PropTypes.bool,
  options: PropTypes.array,
  onFileSelect: PropTypes.func,
  onRemoveFile: PropTypes.func,
};
