"use client";

import useBottomNavigationState from "#/hooks/use-bottom-navigator-state";

const BottomNavigator = () => {
  const { onCurrentSelectedItemChanged, bottomNavItems, currentSelectedItem } =
    useBottomNavigationState();

  return (
    <div className="flex justify-evenly p-4">
      {bottomNavItems.map((item, index) => {
        return (
          <div
            key={item.label}
            className={`flex flex-col w-full items-center ${
              index !== bottomNavItems.length - 1 ? "border-r-[1px]" : ""
            }`}
            onClick={() => onCurrentSelectedItemChanged(item)}
          >
            {currentSelectedItem === item ? item.selectedIcon : item.icon}
          </div>
        );
      })}
    </div>
  );
};

export default BottomNavigator;
