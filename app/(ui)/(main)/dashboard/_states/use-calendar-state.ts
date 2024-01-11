import { sliceResetFns } from "#/providers/reset-app-states";
import { DateRange } from "react-day-picker";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const currentDate = new Date();

interface IUseCalendarState {
  selectedDate: DateRange;
}

const defaultCalendarState = {
  selectedDate: {
    from: currentDate,
    to: currentDate,
  },
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

  const { selectedDate } = store();

  const onSelectDate = (date: DateRange) => {
    store.setState({
      selectedDate: {
        from: date.from,
        to: date.to,
      },
    });
  };

  return {
    selectedDate,
    onSelectDate,
  };
};

export default useCalendarState;
