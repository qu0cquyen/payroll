"use client";

import { PropsWithChildren, useEffect } from "react";

export const sliceResetFns = new Set<() => void>();

const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

const ResetAppStateProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    return () => {
      resetAllSlices();
    };
  });

  return <>{children}</>;
};

export default ResetAppStateProvider;
