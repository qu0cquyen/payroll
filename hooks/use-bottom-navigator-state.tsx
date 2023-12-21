import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type BottomNavProps = {
  path: string;
  icon: any;
  selectedIcon: any;
  label: string;
};

const bottomNavItems: BottomNavProps[] = [
  {
    path: "/dashboard",
    icon: <DashboardIcon width={24} height={24} />,
    selectedIcon: (
      <DashboardIcon className="text-primary" width={24} height={24} />
    ),
    label: "Dashboard",
  },
  {
    path: "/profile",
    icon: <PersonIcon width={24} height={24} />,
    selectedIcon: (
      <PersonIcon className="text-primary" width={24} height={24} />
    ),
    label: "Profile",
  },
];

export interface IBottomNavigationState {
  currentSelectedItem: BottomNavProps;
  bottomNavItems: BottomNavProps[];
}

const defaultState: IBottomNavigationState = {
  currentSelectedItem: bottomNavItems[0],
  bottomNavItems: bottomNavItems,
};

const store = create(
  immer<IBottomNavigationState>(() => ({
    ...defaultState,
  }))
);

const useBottomNavigationState = () => {
  const { currentSelectedItem } = store();

  const onCurrentSelectedItemChanged = (selectedItem: BottomNavProps) => {
    store.setState({ currentSelectedItem: selectedItem });
  };

  return { onCurrentSelectedItemChanged, bottomNavItems, currentSelectedItem };
};

export default useBottomNavigationState;
