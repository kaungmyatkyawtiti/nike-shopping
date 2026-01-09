"use server";

import { auth } from "../auth";

export const signIn = async (formData: FormData) => {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const data = SignUpSchema.parse(rawData);
  const res = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: "/dashboard"
    }
  })

  return {
    ok: true,
    userId: res.user.id,
  }
}
