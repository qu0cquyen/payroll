"use server";

import clientPromise from "#/repositories/repositories";
import { Session, decodeSession } from "#/utils/jwt-generator";
import { ObjectId } from "mongodb";
import {
  ServiceRecordList,
  ServiceRecordModel,
} from "../model/service-record-model";

export const getServiceRecords = async (
  token: string | null,
  date: Date
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

    const records = await db
      .collection("service_records")
      .find({
        user_id: new ObjectId(userId),
        created_at: {
          $gte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            0,
            0,
            0,
            0
          ),
          $lte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            23,
            59,
            59,
            999
          ),
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
        customerName: record.customer_name,
        serviceId: record.service_id.toString(),
        serviceName: record.service_name,
        servicePrice: record.service_price,
        tip: record.tip,
        total: record.total,
        staffCommission: record.staff_commission,
        staffTotal: record.staff_total,
        createdAt: record.created_at,
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

    console.log(e);

    throw new Error((e as Error).message);
  }
};

export const addServiceRecord = async ({
  token,
  customerName,
  serviceName,
  amount,
  tip,
  rate,
}: {
  token: string | null;
  customerName: string;
  serviceName: string;
  amount: number;
  tip: number;
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
      total: amount + tip,
    });
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    }

    throw new Error((e as Error).message);
  }
};
