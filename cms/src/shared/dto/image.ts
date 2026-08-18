export interface ImageDTO {
  url: string;
  alt: string;

  width: number | null;
  height: number | null;

  sizes: Record<string, string | null>;
}