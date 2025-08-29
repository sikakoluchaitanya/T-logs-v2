"use server";

import { auth } from "./auth";

export const getIdServerAction = async () => {
  const session = await auth();
  return session?.user?._id;
};
