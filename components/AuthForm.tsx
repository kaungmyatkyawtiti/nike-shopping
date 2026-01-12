"use client";

import { useForm } from "@tanstack/react-form";
import { FormEvent, useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signUp } from "@/lib/actions/auth-action";
import { signInSchema, signUpSchema } from "@/lib/zodSchemas";

interface Props {
  mode: "sign-in" | "sign-up";
  onSubmit: (formData: FormData) => Promise<{ ok: boolean; userId?: string } | void>
};

export default function AuthForm({
  mode,
  onSubmit,
}: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const result = await onSubmit(formData)

      if (result?.ok) router.push("/");
    } catch (error) {
      console.log("form submit error", error);
    }
  }

  const defaultValues =
    mode === "sign-in"
      ? {
        email: "",
        password: "",
      }
      : {
        name: "",
        email: "",
        password: "",
      };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: mode === "sign-in" ? signInSchema : signUpSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("value", value);
      form.reset()
    },
  })

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <p className="text-[15px] text-foreground/85">
          {mode === "sign-in" ? "Don’t have an account? " : "Already have an account? "}
          <Link
            href={mode === "sign-in" ? "/sign-up" : "/sign-in"}
            className="text-blue-500 underline"
          >
            {mode === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
        <h1 className="mt-3 text-2xl font-semibold">
          {mode === "sign-in" ? "Welcome Back!" : "Join Nike Today!"}
        </h1>
        <p className="mt-1 text-foreground/85 text-[15px]">
          {
            mode === "sign-in"
              ? "Sign in to continue your journey"
              : "Create your account to start your fitness journey"
          }
        </p>
      </div>

      <SocialProviders variant={mode} />

      <div className="flex items-center gap-4">
        <hr className="h-px w-full border-0 bg-muted" />
        <span className="shrink-0 text-[15px] text-foreground/80">
          Or {mode === "sign-in" ? "sign in" : "sign up"} with
        </span>
        <hr className="h-px w-full border-0 bg-muted" />
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <FieldGroup>

          {mode === "sign-up" && (
            <Field>
              <FieldLabel htmlFor="name" className="text-[16px]">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                autoComplete="off"
                className="h-10"
              />
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="email" className="text-[16px]">Email</FieldLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              className="h-10"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className="text-[16px]">Password</FieldLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              className="h-10"
            />
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          className="mt-2 w-full rounded-md bg-orange-500 hover:bg-orange-500/90 focus:outline-none font-semibold h-10 text-[16px]"
        >
          {mode === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>

        {mode === "sign-up" && (
          <p className="text-center text-[15px] text-foreground/85">
            By signing up, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
