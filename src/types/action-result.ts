export type ActionResult = {
  success?: boolean;
  errors?: ActionErrors;
};

export type ActionErrors = {
  fieldErrors?: FieldErrors;
  formErrors?: string[];
};

export type FieldErrors = {
  [x: string]: string | undefined;
  [x: number]: string | undefined;
  [x: symbol]: string | undefined;
};
