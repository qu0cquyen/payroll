"use client";

import useBottomNavigationState from "#/hooks/use-bottom-navigator-state";
import Link from "next/link";

const BottomNavigator = () => {
  const { onCurrentSelectedItemChanged, bottomNavItems, currentSelectedItem } =
    useBottomNavigationState();

  return (
    <div
      className="flex fixed bottom-0 justify-evenly p-4 w-full"
      style={{
        boxShadow: "0px 0px 1px #888888",
      }}
    >
      {bottomNavItems.map((item, index) => {
        return (
          <Link
            href={`${item.path}`}
            key={item.label}
            onClick={() => onCurrentSelectedItemChanged(item)}
            className={`flex flex-col w-full items-center ${
              index !== bottomNavItems.length - 1 ? "border-r-[1px]" : ""
            }`}
          >
            <p>
              {currentSelectedItem === item ? item.selectedIcon : item.icon}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigator;
