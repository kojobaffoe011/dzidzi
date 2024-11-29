
function DetailsLayout({ children }) {
  return (
    <div className="">
      <div className="grid-cols-12 grid">
        <div className="col-span-12 h-full"> {children}</div>
      </div>
    </div>
  );
}
export default DetailsLayout;
