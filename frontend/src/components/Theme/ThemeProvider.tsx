'use client';

import { ThemeProvider } from 'next-themes';

interface ThemeColorGroup {
  primary?: string | null;
  primaryForeground?: string | null;

  secondary?: string | null;
  secondaryForeground?: string | null;

  accent?: string | null;
  accentForeground?: string | null;

  background?: string | null;
  foreground?: string | null;

  card?: string | null;
  cardForeground?: string | null;

  muted?: string | null;
  mutedForeground?: string | null;
}

interface ThemeSettings {
  light?: ThemeColorGroup | null;
  dark?: ThemeColorGroup | null;
}

interface ProvidersProps {
  children: React.ReactNode;
  theme?: ThemeSettings | null;
}

function buildThemeVariables(
  theme: ThemeSettings,
) {
  const light = theme.light;
  const dark = theme.dark;

  const buildVariables = (
    colors?: ThemeColorGroup | null,
  ) => ({
    ...(colors?.primary && {
      '--primary': colors.primary,
    }),

    ...(colors?.primaryForeground && {
      '--primary-foreground':
        colors.primaryForeground,
    }),

    ...(colors?.secondary && {
      '--secondary': colors.secondary,
    }),

    ...(colors?.secondaryForeground && {
      '--secondary-foreground':
        colors.secondaryForeground,
    }),

    ...(colors?.accent && {
      '--accent': colors.accent,
    }),

    ...(colors?.accentForeground && {
      '--accent-foreground':
        colors.accentForeground,
    }),

    ...(colors?.background && {
      '--background': colors.background,
    }),

    ...(colors?.foreground && {
      '--foreground': colors.foreground,
    }),

    ...(colors?.card && {
      '--card': colors.card,
    }),

    ...(colors?.cardForeground && {
      '--card-foreground':
        colors.cardForeground,
    }),

    ...(colors?.muted && {
      '--muted': colors.muted,
    }),

    ...(colors?.mutedForeground && {
      '--muted-foreground':
        colors.mutedForeground,
    }),
  });

  const toCssVariables = (
    variables: Record<string, string>,
  ) =>
    Object.entries(variables)
      .map(
        ([key, value]) =>
          `${key}: ${value};`,
      )
      .join('\n');

  return {
    light: toCssVariables(
      buildVariables(light),
    ),

    dark: toCssVariables(
      buildVariables(dark),
    ),
  };
}

export default function Providers({
  children,
  theme,
}: ProvidersProps) {
  const variables = theme
    ? buildThemeVariables(theme)
    : null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {variables && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                ${variables.light}
              }

              .dark {
                ${variables.dark}
              }
            `,
          }}
        />
      )}

      {children}
    </ThemeProvider>
  );
}