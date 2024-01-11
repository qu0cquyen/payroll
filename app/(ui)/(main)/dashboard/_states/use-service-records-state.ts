import { create } from "zustand";
import {
  ServiceRecordList,
  ServiceRecordModel,
} from "../model/service-record-model";
import { immer } from "zustand/middleware/immer";
import { getServiceRecords } from "../actions/service-records";
import { LocalStorage } from "#/utils/local-storage";
import useCalendarState from "./use-calendar-state";
import { sliceResetFns } from "#/providers/reset-app-states";

interface IUseServiceRecordState {
  loading: boolean;
  error: string | null;
  serviceRecords: ServiceRecordList | null;
}

const defaultUseServiceRecordState = {
  loading: true,
  error: null,
  serviceRecords: null,
};

const store = create(
  immer<IUseServiceRecordState>(() => ({
    ...defaultUseServiceRecordState,
  }))
);

const useServiceRecordState = () => {
  sliceResetFns.add(() =>
    store.setState({
      ...defaultUseServiceRecordState,
    })
  );
  const { loading, serviceRecords, error } = store();

  const { selectedDate } = useCalendarState();

  const token = LocalStorage.getAccessToken();

  const fetchData = async () => {
    try {
      const records = await getServiceRecords(token, selectedDate);
      store.setState({ serviceRecords: records });
    } catch (e) {
      if (typeof e === "string") {
        store.setState({ loading: false, error: e });
      } else {
        store.setState({ loading: false, error: (e as Error).toString() });
      }
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { loading, serviceRecords, error, fetchData, refetch };
};

export default useServiceRecordState;
