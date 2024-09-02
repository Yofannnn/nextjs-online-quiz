import { updateSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function updateSessionMiddleware(request: NextRequest) {
  const response = await updateSession(request);
  return response ? response : NextResponse.next();
}
