"use server";

import { LoginSchema, RegisterSchema } from "@/validation/user.validation";
import { ActionResult } from "@/types/action-result";
import { formatError } from "@/lib/format-error";
import { login, register } from "@/lib/auth";

export async function registerAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validationResult = await RegisterSchema.safeParseAsync(rawFormData);

  if (!validationResult.success) {
    return {
      errors: formatError(validationResult.error),
    };
  }

  const { name, email, password } = validationResult.data;

  try {
    await register({ name, email, password });
    return { success: true };
  } catch (error: any) {
    return { success: false, errors: formatError(error.message) };
  }
}

export async function loginAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validationResult = await LoginSchema.safeParseAsync(rawFormData);

  if (!validationResult.success) {
    return {
      errors: formatError(validationResult.error),
    };
  }

  const { email, password } = validationResult.data;

  try {
    await login({ email, password });
    return { success: true };
  } catch (error: any) {
    return { success: false, errors: formatError(error.message) };
  }
}
