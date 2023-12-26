"use server";

import clientPromise from "#/repositories/repositories";
import { encodeSession } from "#/utils/jwt-generator";

export async function userLogin(username: string, password: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);

  try {
    const user = await db
      .collection("user")
      .findOne({ user_name: username, password: password });

    if (!user) return null;

    // Generate ACCESS TOKEN + REFRESH TOKEN
    const accessToken = encodeSession(process.env.SECRET_ACCESS_TOKEN_KEY!, {
      id: user._id.toString(),
      username: user.user_name,
    });

    const refreshToken = encodeSession(process.env.SECRET_REFRESH_TOKEN_KEY!, {
      id: user._id.toString(),
      username: user.user_name,
    });

    return {
      id: user._id.toString(),
      user_name: user.user_name,
      rate: user.rate,
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    };
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    }

    throw new Error((e as Error).message);
  }
}
