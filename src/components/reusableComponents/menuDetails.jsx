import React from "react";
import DetailsLayout from "./detailsLayout";

function MenuDetails({ children, isRestaurantPage, filters }) {
  return (
    <div className="flex flex-col gap-4">
      <DetailsLayout isRestaurantPage={isRestaurantPage} filters={filters}>
        {children}
      </DetailsLayout>
    </div>
  );
}
export default MenuDetails;
