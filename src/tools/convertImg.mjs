import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const convertToWebP = async (lang, quality = 75) => {
  await imagemin([`data/images/${lang}/wiki-v1/*.png`], {
    destination: `data/images/${lang}/webp${quality}`,
    plugins: [
      imageminWebp({ quality })
    ]
  });
};

await convertToWebP('fr', 80);
await convertToWebP('en', 80);
console.log('Images optimized');
