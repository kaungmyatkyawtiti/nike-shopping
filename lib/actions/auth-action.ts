"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { signInSchema, signUpSchema } from "../zodSchemas";

export const signUp = async (formData: FormData) => {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const data = signUpSchema.parse(rawData);
  const res = await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard"
    }
  })

  return {
    ok: true,
    userId: res.user.id,
  }
}

export const signIn = async (formData: FormData) => {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const data = signInSchema.parse(rawData);
  const res = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    }
  })

  return {
    ok: true,
    userId: res.user.id,
  }
}

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    return session?.user ?? null;
  } catch (error) {
    console.log("getCurrentUser error", error);
    return null;
  }
}
