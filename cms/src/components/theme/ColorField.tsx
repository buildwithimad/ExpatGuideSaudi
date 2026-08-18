'use client';


import { FieldLabel, useField } from '@payloadcms/ui';
import type { TextFieldClientComponent } from 'payload';

const ColorField: TextFieldClientComponent = ({
  path,
  field,
}) => {
  const { value, setValue } = useField<string>({
    path,
  });

  const currentValue =
    typeof value === 'string'
      ? value
      : '';

  const pickerValue =
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(
      currentValue,
    )
      ? currentValue
      : '#000000';

  return (
    <div
      style={{
        marginBottom: '1rem',
      }}
    >
      <FieldLabel
        label={field.label || field.name}
        required={field.required}
        path={path}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '8px',
        }}
      >
        {/* Color Picker */}
        <input
          type="color"
          value={pickerValue}
          onChange={(event) => {
            setValue(
              event.target.value.toUpperCase(),
            );
          }}
          style={{
            width: '48px',
            height: '42px',
            padding: '3px',
            border:
              '1px solid var(--theme-elevation-200)',
            borderRadius: '6px',
            background: 'transparent',
            cursor: 'pointer',
          }}
          aria-label={
            typeof field.label === 'string'
              ? field.label
              : field.name
          }
        />

        {/* HEX Input */}
        <input
          type="text"
          value={currentValue}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="#006C35"
          style={{
            flex: 1,
            height: '42px',
            padding: '0 12px',
            border:
              '1px solid var(--theme-elevation-200)',
            borderRadius: '6px',
            background:
              'var(--theme-input-bg)',
            color:
              'var(--theme-text)',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
          }}
        />
      </div>

      <div
        style={{
          marginTop: '6px',
          fontSize: '12px',
          color:
            'var(--theme-elevation-500)',
        }}
      >
        Choose a color or enter a HEX value.
      </div>
    </div>
  );
};

export default ColorField;