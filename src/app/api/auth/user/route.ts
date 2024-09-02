import connectToDatabase from "@/lib/mongoose";
import { findUserByID } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  try {
    const user = await findUserByID(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, statusText: "User not found" }
      );
    }
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
