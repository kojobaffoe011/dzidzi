const TableLoader = () => {
  return (
    <div className="mb-2 flex flex-col space-y-2.5 animate-pulse gap-1">
      <div className="flex w-full gap-1">
        {Array(5)
          .fill("")
          .map((item, idx) => {
            return (
              <div
                className="w-full px-6 py-3 h-[50px] bg-slate-200 dark:bg-slate-200"
                key={idx}
              >
                {/* a */}{" "}
              </div>
            );
          })}
      </div>
      <div className="flex flex-col gap-1">
        {Array(10)
          .fill("")
          .map((item, idx) => {
            return (
              <div
                className="w-full px-6 py-3 h-[50px] bg-slate-200 dark:bg-slate-200"
                key={idx}
              >
                {/* a */}{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TableLoader;
