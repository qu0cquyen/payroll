"use server";

import clientPromise from "#/repositories/repositories";
import { Session, decodeSession } from "#/utils/jwt-generator";
import { ObjectId } from "mongodb";
import {
  ServiceRecordList,
  ServiceRecordModel,
} from "../model/service-record-model";
import { DateRange } from "react-day-picker";
import { isNil } from "lodash";

export const getServiceRecords = async (
  token: string | null,
  date: DateRange
): Promise<ServiceRecordList | null> => {
  if (!token) return null;

  const decodedData = decodeSession(
    process.env.SECRET_ACCESS_TOKEN_KEY!,
    token
  );

  try {
    const userId = (decodedData as { type: string; session: Session }).session
      .id;

    const client = await clientPromise;

    const db = await client.db(process.env.MONGODB_DB_NAME);

    if (isNil(date.from) || isNil(date.to)) {
      throw new Error("Invalid incoming date");
    }

    const beginDate = new Date(
      new Date(new Date(date.from).setUTCHours(0, 0, 0, 0)).toISOString()
    );
    const endDate = new Date(
      new Date(new Date(date.to).setUTCHours(23, 59, 59, 999)).toISOString()
    );

    const records = await db
      .collection("service_records")
      .find({
        user_id: new ObjectId(userId),
        created_at: {
          $gte: beginDate,
          $lte: endDate,
        },
      })
      .toArray();

    let totalAmount = 0;
    let totalTip = 0;
    let totalStaffCommission = 0;

    const normalizedRecs = records.map((record) => {
      totalAmount += record.service_price;
      totalTip += record.tip;
      totalStaffCommission += record.staff_commission + record.tip;

      const r: ServiceRecordModel = {
        id: record._id.toString(),
        userId: record.user_id.toString(),
        customerId: record.customer_id.toString(),
        customerName: record.customer_name ?? "",
        serviceId: record.service_id.toString(),
        serviceName: record.service_name ?? "",
        servicePrice: record.service_price ?? "",
        tip: record.tip ?? 0,
        total: record.total ?? 0,
        staffCommission: record.staff_commission ?? 0,
        staffTotal: record.staff_total ?? 0,
        paymentMethodName: record.payment_method_name ?? "Cash",
        createdAt: record.created_at ?? "",
      };

      return r;
    });

    return {
      records: normalizedRecs,
      totalAmount: totalAmount,
      totalTip: totalTip,
      totalStaffCommission: totalStaffCommission,
    };
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    }

    throw new Error((e as Error).message);
  }
};

export const addServiceRecord = async ({
  token,
  customerName,
  serviceName,
  amount,
  tip,
  paymentMethodName,
  rate,
}: {
  token: string | null;
  customerName: string;
  serviceName: string;
  amount: number;
  tip: number;
  paymentMethodName: string;
  rate: number;
}) => {
  if (!token) return;

  const decodedData = decodeSession(
    process.env.SECRET_ACCESS_TOKEN_KEY!,
    token
  );

  const userId = (decodedData as { type: string; session: Session }).session.id;

  const client = await clientPromise;

  const db = await client.db(process.env.MONGODB_DB_NAME);

  const paymentObjectId =
    paymentMethodName.toLowerCase() === "cash"
      ? new ObjectId("659f12fb7c8b26f866a786bd")
      : new ObjectId("659f12da7c8b26f866a786bb");

  try {
    await db.collection("service_records").insertOne({
      _id: new ObjectId(),
      user_id: new ObjectId(userId),
      customer_id: new ObjectId(),
      customer_name: customerName,
      service_id: new ObjectId(),
      service_name: serviceName,
      service_price: amount,
      tip: tip,
      created_at: new Date(),
      staff_commission: amount * rate,
      staff_total: amount * rate + tip,
      payment_method_id: paymentObjectId,
      payment_method_name: paymentMethodName,
      total: amount + tip,
    });
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    }

    throw new Error((e as Error).message);
  }
};
