"use server";

import { AppUser } from "#/models/user-model";
import clientPromise from "#/repositories/repositories";
import { checkExpirationStatus, decodeSession } from "#/utils/jwt-generator";
import { ObjectId } from "mongodb";

export const userVerification = async (
  token: string
): Promise<AppUser | null> => {
  const userToken = decodeSession(process.env.SECRET_ACCESS_TOKEN_KEY!, token);

  if (userToken.type !== "valid") {
    return null;
  }

  const isExpired = await checkExpirationStatus({
    id: userToken.session.id,
    username: userToken.session.username,
    issued: userToken.session.issued,
    expires: userToken.session.expires,
  });

  if (isExpired === "expired") {
    return null;
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const user = await db
      .collection("user")
      .findOne({ _id: new ObjectId(userToken.session.id) });

    if (!user) return null;

    return {
      id: user._id.toString(),
      userName: user.user_name,
      rate: user.rate,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
