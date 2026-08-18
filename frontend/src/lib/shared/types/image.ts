export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes: Record<string, string | null>;
}