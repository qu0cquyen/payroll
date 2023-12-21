import { sliceResetFns } from "#/providers/reset-app-states";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const currentDate = new Date();

interface IUseCalendarState {
  isCalendarOpen: boolean;
  selectedDate: Date;
}

const defaultCalendarState = {
  isCalendarOpen: false,
  selectedDate: currentDate,
};

const store = create(
  immer<IUseCalendarState>(() => ({
    ...defaultCalendarState,
  }))
);

const useCalendarState = () => {
  sliceResetFns.add(() =>
    store.setState({
      ...defaultCalendarState,
    })
  );

  const { isCalendarOpen, selectedDate } = store();

  const onCalendarClick = () => {
    store.setState({
      isCalendarOpen: true,
    });
  };

  const onCalendarClose = () => {
    store.setState({
      isCalendarOpen: false,
    });
  };

  const onSelectDate = (date: Date) => {
    store.setState({
      selectedDate: date,
    });
  };

  return {
    isCalendarOpen,
    selectedDate,
    onCalendarClick,
    onCalendarClose,
    onSelectDate,
  };
};

export default useCalendarState;
