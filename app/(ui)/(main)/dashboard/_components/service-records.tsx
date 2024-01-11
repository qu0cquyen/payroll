/* eslint-disable react-hooks/exhaustive-deps */
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "#/components/ui/table";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import useServiceRecordState from "../_states/use-service-records-state";
import useCalendarState from "../_states/use-calendar-state";
import { FontStyleIcon, IdCardIcon } from "@radix-ui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

const ServiceRecords = () => {
  const { loading, serviceRecords, error, fetchData } = useServiceRecordState();
  const { selectedDate } = useCalendarState();

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  return (
    <Table className="mt-2 ">
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Tip</TableHead>
          <TableHead>Staff Commission</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serviceRecords &&
          !isEmpty(serviceRecords) &&
          serviceRecords.records.map((record) => {
            return (
              <TableRow key={record.id}>
                <TableCell>
                  <p className="flex line-clamp-2 break-all gap-2 items-center">
                    {record.paymentMethodName.toLowerCase() === "cash" ? (
                      <FontAwesomeIcon
                        icon={faDollarSign}
                        className="text-primary"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="text-primary"
                      />
                    )}
                    {record.customerName}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-2  break-all">
                    {record.serviceName}
                  </p>
                </TableCell>
                <TableCell>${record.servicePrice.toFixed(2)}</TableCell>
                <TableCell>${record.tip.toFixed(2)}</TableCell>
                <TableCell>${record.staffTotal.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total </TableCell>
          <TableCell className="text-right">
            ${(serviceRecords?.totalAmount ?? 0).toFixed(2)}
          </TableCell>
          <TableCell className="text-right">
            ${(serviceRecords?.totalTip ?? 0).toFixed(2)}
          </TableCell>
          <TableCell className="text-left">
            ${(serviceRecords?.totalStaffCommission ?? 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ServiceRecords;
