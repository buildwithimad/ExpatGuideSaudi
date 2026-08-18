import type { Field } from 'payload';

type UrlFieldOptions = {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
};

export function urlField({
  name,
  label,
  required = false,
  description = 'Enter a valid URL.',
}: UrlFieldOptions): Field {
  return {
    name,
    label,

    type: 'text',

    required,

    validate: (
      value: string | null | undefined,
    ) => {
      if (!value) {
        return required
          ? 'This field is required.'
          : true;
      }

      try {
        new URL(value.trim());

        return true;
      } catch {
        return 'Please enter a valid URL.';
      }
    },

    admin: {
      placeholder: 'https://...',
      description,
    },
  };
}