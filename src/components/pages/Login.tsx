"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/auth.action";
import { useActionErrors } from "@/lib/use-action-errors";
import { toast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, {});
  const { errors, setFieldError } = useActionErrors(state);
  const fieldErrors = errors?.fieldErrors || {};
  const formErrors = errors?.formErrors;

  useEffect(() => {
    if (errors && formErrors?.length !== 0) {
      toast({
        variant: "destructive",
        title: "Upsss",
        description: errors?.formErrors?.join(" "),
      });
    }
  }, [errors, errors?.formErrors, formErrors?.length]);

  return (
    <div className="w-full min-h-svh flex justify-center items-center px-2 py-6">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <p className="text-xs text-destructive">{fieldErrors?.email}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
              <p className="text-xs text-destructive">
                {fieldErrors?.password}
              </p>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
