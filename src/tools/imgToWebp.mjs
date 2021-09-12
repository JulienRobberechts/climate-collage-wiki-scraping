import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const options125 = {
  quality: 98,
  resize: { width: 125, height: 85 },
};

const options250 = {
  quality: 90,
  resize: { width: 250, height: 170 },
};

const options450 = {
  quality: 92,
  resize: { width: 450, height: 306 },
};

const options600 = {
  quality: 95,
  resize: { width: 600, height: 408 },
};

const convertToWebP = async (lang, options) => {
  await imagemin([`data/images/${lang}/png/*.png`], {
    destination: `data/images/${lang}/${options.resize.width}`,
    plugins: [imageminWebp(options)],
  });
};

async function convertAllImgToWebp() {
  await convertToWebP("fr", options125);
  await convertToWebP("fr", options250);
  await convertToWebP("fr", options450);
  await convertToWebP("fr", options600);

  await convertToWebP("en", options125);
  await convertToWebP("en", options250);
  await convertToWebP("en", options450);
  await convertToWebP("en", options600);

  await convertToWebP("es", options125);
  await convertToWebP("es", options250);
  await convertToWebP("es", options450);
  await convertToWebP("es", options600);
}

// convertAll().then(() => console.log("conversion completed"));

export default convertAllImgToWebp;
