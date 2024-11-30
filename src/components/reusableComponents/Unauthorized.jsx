
import { FcLock } from "react-icons/fc";
import { Link } from "react-router-dom";
// import Button from "../reusableComponents/Button";
import Button from "./Button"

/**
 * The `Unauthorized` component displays a message and an optional icon when a user's
 * account is locked. It typically provides an option to continue and unlock the account
 *
 * @param {Object} props - React props for configuring the component.
 * @param {ReactNode} props.icon - An optional icon to display (default is a lock icon).
 * @param {String} props.message - The message to display when the account is locked.
 * @param {String} props.link - The link to navigate when the user chooses to continue.
 * @param {String} props.hidden - Additional CSS classes to hide the component (optional).
 * @returns {JSX.Element} The rendered component for displaying locked account information.
 */
const Unauthorized = ({icon, message, hidden, link}) => {
  return (
    <div className="flex w-[500px] justify-center mt-16 p-4">
      <div className="w-full">
        <div className="p-4 rounded-xl bg-white shadow-md bg-[#fcfcfc] w-full">
          <div className="col-span-2 flex flex-col justify-center items-center">
            {icon || <FcLock className="text-red-600" size="300px" />}
          </div>
          <div className="col-span-2 flex flex-col justify-center items-center">
            {/* Display the provided message or a default message */}
            <p className="text-center font-bold">
              {message ||
                `Complete previous step to continue`}
            </p>
          </div>
          <div className=" mt-6 w-full">
            <Link
              to={ link }
            >
              <Button
                className={`px-6 py-4 bg-blue-500 text-white font-bold w-full rounded ${hidden ? 'hidden' : ''}`}
              >
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Unauthorized