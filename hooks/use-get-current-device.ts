import useWindowDimensions from "./use-window-dimensions";

const useGetCurrentDevice = () => {
  const { width } = useWindowDimensions();

  if (width < 640) {
    return "mobile";
  }

  if (width >= 640 && width < 1024) {
    return "tablet";
  }

  return "desktop";
};

export default useGetCurrentDevice;
