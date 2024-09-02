"use server";

import { createUser, findUserByEmail } from "@/services/user.service";
import { comparePassword, hashPassword } from "./hash";
import { signJWT, verifyJWT } from "./jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "./mongoose";

async function setSessionCookie(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", token, {
    httpOnly: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  await connectToDatabase();
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email is already exist");
  }
  const hashedPassword = hashPassword(data.password);
  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
  if (!user) {
    throw new Error("An error occurred while creating your account");
  }
  const token = signJWT({ userId: user._id });
  await setSessionCookie(token);
}

export async function login(data: { email: string; password: string }) {
  await connectToDatabase();
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new Error("Email not found.");
  }
  const isValidPassword = comparePassword(data.password, user.password);
  if (!isValidPassword) {
    throw new Error("Password is incorrect.");
  }
  const token = signJWT({ userId: user._id });
  await setSessionCookie(token);
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  return session ? verifyJWT(session) : null;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = verifyJWT(session);
  const token = signJWT(parsed);
  const res = NextResponse.next();
  res.cookies.set("session", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "strict",
    path: "/",
  });
  return res;
}

export async function logout() {
  cookies().set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  });
}
