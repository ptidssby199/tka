import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generate() {
  const iconSvgPath = path.resolve('public/icon.svg');
  const maskableSvgPath = path.resolve('public/icon-maskable.svg');

  const iconSvg = fs.readFileSync(iconSvgPath);
  const maskableSvg = fs.readFileSync(maskableSvgPath);

  // 192x192 PNG
  await sharp(iconSvg)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('public/pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 512x512 PNG
  await sharp(iconSvg)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public/pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // 512x512 Maskable PNG
  await sharp(maskableSvg)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public/pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  // 180x180 Apple Touch Icon PNG
  await sharp(iconSvg)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('public/apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 32x32 Favicon PNG
  await sharp(iconSvg)
    .resize(32, 32)
    .png()
    .toFile(path.resolve('public/favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  console.log('All PWA icon assets generated successfully.');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
