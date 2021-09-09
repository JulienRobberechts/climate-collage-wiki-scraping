import { PDFImage } from "pdf-image";
import fs from "fs";

const convertListOfPdfToImg = async (lang) => {
  for (let cardNum = 3; cardNum <= 3; cardNum++) {
    await convertPdfToImg(lang, cardNum);
  }
  console.log("all done ");
};

const optionsPDF = () => ({
  convertOptions: {
    "-quality": "100",
    "-density": "200",

  },
});

const convertPdfToImg = async (lang, cardNum) => {
  var pdfImage = new PDFImage(
    `data/images/${lang}/pdf/${cardNum}-front.pdf`,
    optionsPDF()
  );

  const pngPath = `data/images/${lang}/pdf/${cardNum}-front-0.png`;
  try {
    if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
    const imagePath = await pdfImage.convertPage(0);
    console.log("done :" + imagePath);
  } catch (error) {
    console.log("conversion error " + cardNum, error);
  }
};

async function convertAllPdfToImg() {
  await convertListOfPdfToImg("fr");
}

export default convertAllPdfToImg;
