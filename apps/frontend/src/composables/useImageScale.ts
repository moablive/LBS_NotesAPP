/**
 * Reduz uma imagem antes de virar data URL.
 *
 * Existe porque ícone e capa são gravados embutidos no JSON da nota: sem reduzir,
 * uma foto de celular estoura o limite de payload do backend (10MB/req).
 */
export function scaleImageFile(
  file: File,
  maxDim: number,
  mime = 'image/jpeg',
  quality = 0.85,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('imagem inválida'));
      img.onload = () => {
        let { width, height } = img;
        const largest = Math.max(width, height);
        if (largest > maxDim) {
          const scale = maxDim / largest;
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('canvas indisponível'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(mime, quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
