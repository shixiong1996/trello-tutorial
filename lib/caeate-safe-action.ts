export type FieldErrors<T> = {
  [key in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldError?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
}

