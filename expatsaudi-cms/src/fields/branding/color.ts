import type { Field } from 'payload';

type ColorFieldOptions = {
  name: string;
  label: string;
  defaultValue: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
};

export function colorField({
  name,
  label,
  defaultValue,
  required = true,
  description = 'Choose a color or enter a HEX value.',
  placeholder = '#006C35',
}: ColorFieldOptions): Field {
  return {
    name,
    label,
    type: 'text',

    required,

    defaultValue,

    validate: (
      value: string | null | undefined,
    ) => {
      if (!value) {
        return required
          ? 'This field is required.'
          : true;
      }

      const color = value.trim();

      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(
        color,
      )
        ? true
        : 'Please enter a valid HEX color (e.g. #006C35).';
    },

    admin: {
      placeholder,
      description,

      components: {
        Field:
          '@/components/theme/ColorField',
      },
    },
  };
}