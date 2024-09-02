"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { registerAction } from "@/actions/auth.action";
import { useActionErrors } from "@/lib/use-action-errors";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerAction, {});
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
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="your name" name="name" required />
              <p className="text-xs text-destructive">{fieldErrors?.name}</p>
            </div>
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
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
