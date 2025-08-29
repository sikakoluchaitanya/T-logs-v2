"use server";

import connectToDatabase from "@/lib/db/dbConnect";
import User from "@/models/user.model";

export async function getAuthorInfo({ id }: { id: string }) {
  await connectToDatabase();
  const author = await User.findById(id);
  return author;
}
