import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 80;
const WIDTHS = [640, 750, 1080, 1200, 1920];

async function optimizeImages(dir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await optimizeImages(filePath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
      continue;
    }

    try {
      const fileName = path.basename(file, ext);
      const dirName = path.dirname(filePath);
      
      // Create WebP version
      await sharp(filePath)
        .webp({ quality: QUALITY })
        .toFile(path.join(dirName, `${fileName}.webp`));
      
      // Create AVIF version if supported
      try {
        await sharp(filePath)
          .avif({ quality: QUALITY })
          .toFile(path.join(dirName, `${fileName}.avif`));
      } catch (e) {
        console.warn(`Could not create AVIF for ${file}:`, e.message);
      }
      
      // Create responsive sizes
      for (const width of WIDTHS) {
        await sharp(filePath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(path.join(dirName, `${fileName}-${width}w.webp`));
      }
      
      console.log(`Optimized: ${filePath}`);
    } catch (e) {
      console.error(`Error optimizing ${filePath}:`, e);
    }
  }
}

// Run optimization
try {
  await optimizeImages(PUBLIC_DIR);
  console.log('Image optimization complete!');
} catch (error) {
  console.error('Error during image optimization:', error);
  process.exit(1);
}
