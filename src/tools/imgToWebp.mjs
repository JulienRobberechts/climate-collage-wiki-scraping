import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const options80 = {
  quality: 70,
  resize: { width: 80, height: 54.4 },
};
const options200 = {
  quality: 80,
  resize: { width: 200, height: 136 },
};
const options400 = {
  quality: 80,
  resize: { width: 400, height: 272 },
};

const convertToWebP = async (lang, options) => {
  await imagemin([`data/images/${lang}/wiki-v1/*.png`], {
    destination: `data/images/${lang}/${options.resize.width}`,
    plugins: [imageminWebp(options)],
  });
};

async function convertAllImgToWebp() {
  await convertToWebP("fr", options80);
  await convertToWebP("en", options80);
  await convertToWebP("fr", options200);
  await convertToWebP("en", options200);
  await convertToWebP("fr", options400);
  await convertToWebP("en", options400);
}

// convertAll().then(() => console.log("conversion completed"));

export default convertAllImgToWebp;
