"use server";

import clientPromise from "#/repositories/repositories";
import { checkExpirationStatus, decodeSession } from "#/utils/jwt-generator";
import { ObjectId } from "mongodb";

export const userVerification = async (token: string) => {
  const userToken = decodeSession(process.env.SECRET_ACCESS_TOKEN_KEY!, token);

  if (userToken.type !== "valid") {
    return false;
  }

  const isExpired = await checkExpirationStatus({
    id: userToken.session.id,
    username: userToken.session.username,
    issued: userToken.session.issued,
    expires: userToken.session.expires,
  });

  if (isExpired === "expired") {
    return false;
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const user = await db
      .collection("user")
      .findOne({ _id: new ObjectId(userToken.session.id) });

    if (!user) return false;

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
