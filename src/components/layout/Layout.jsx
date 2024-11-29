import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";

/**
 * The `Layout` component serves as a basic layout structure for a web page.
 * It wraps its child components in a flex container with a minimum height to fill
 * the screen vertically and horizontally center the content.
 *
 * @param {Object} props - React props containing child components.
 * @returns {JSX.Element} The rendered layout with child components.
 */
const Layout = (props) => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (
      auth?.open == true &&
      auth?.orders?.length > 0 &&
      typeof window != "undefined" &&
      window.document
    ) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "scroll";
  }, [auth?.open]);


  const renderContent =()=>{
    if( auth?.open && auth?.orders?.length > 0){
        return <div
          className="bg-black opacity-[0.5] absolute right-0 h-screen w-full z-[10]"
          onClick={() => setAuth({ ...auth, open: false, modal:false})}
        ></div>
      }
    if( auth?.modal){
        return <div
          className="bg-black opacity-[0.5] absolute right-0 h-screen w-full z-[10]"
          onClick={() => setAuth({ ...auth, modal: false, open:false})}
        ></div>
      }
  }
 

  return (
    <div className="flex flex-col min-h-screen mx-auto relative">
     {renderContent()}
      <div className="flex flex-col">{props.children}</div>
    </div>
  );
};

export default Layout;


Layout.propTypes = {
  children: PropTypes.node,
}

