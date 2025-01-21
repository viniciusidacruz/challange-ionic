import { FormControl, FormGroup } from '@angular/forms';

export function buildPayload(
  form: FormGroup<{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    completed: FormControl<boolean | null>;
    finishedAt: FormControl<string | null>;
  }>
) {
  return {
    title: form.value.title!,
    description: form.value.description || '',
    completed: form.value.completed!,
    finishedAt: new Date(form.value.finishedAt!).toISOString(),
  };
}
