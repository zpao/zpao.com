import sharp from 'sharp';

export async function imageInfo(file: string) {
  const { width, height, format } = await sharp(file).metadata();
  if (!width || !height || !['png', 'jpeg'].includes(format)) return null;
  const widths = [
    ...new Set([350, 700, 1400].map((size) => Math.min(size, width))),
  ];
  return { width, height, widths };
}

export function variantName(file: string, width: number) {
  return `${file}.${width}w.webp`;
}
