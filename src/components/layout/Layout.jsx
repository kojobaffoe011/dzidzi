import React from "react";

/**
 * The `Layout` component serves as a basic layout structure for a web page.
 * It wraps its child components in a flex container with a minimum height to fill
 * the screen vertically and horizontally center the content.
 *
 * @param {Object} props - React props containing child components.
 * @returns {JSX.Element} The rendered layout with child components.
 */
const Layout = (props) => {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <div className="flex flex-col">{props.children}</div>
    </div>
  );
};

export default Layout;
