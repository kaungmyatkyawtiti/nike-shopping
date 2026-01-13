"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { signInSchema, signUpSchema } from "../zodSchemas";
import z from "zod";

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

export const signUp = async (values: SignUpValues) => {
  const data = signUpSchema.parse(values);

  const res = await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    }
  })

  return {
    ok: true,
    userId: res.user.id,
  }
}

export const signIn = async (values: SignInValues) => {
  const data = signInSchema.parse(values);

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
    console.log("session", session);
    return session?.user ?? null;
  } catch (error) {
    console.log("getCurrentUser error", error);
    return null;
  }
}
