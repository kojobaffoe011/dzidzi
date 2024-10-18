import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * The `Spinner` component displays a loading spinner to indicate that a process
 * is in progress. It uses the `ClipLoader` component from the `react-spinners`
 * library and centers it on the div vertically and horizontally.
 *
 * @returns {JSX.Element} The rendered loading spinner.
 */
const Spinner = ({color, size}) => {
  return (
    <div className=" flex justify-center items-center">
      <ClipLoader
        color={color}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
}
