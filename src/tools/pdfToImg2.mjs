import { PDFImage } from "pdf-image";
import fs from "fs";

const optionsPDF = () => ({
  convertOptions: {
    "-quality": "100",
    "-density": "200",
  },
});

const fromCardNum = 1;
const toCardNum = 42;

const convertListOfPdfToImg = async (lang) => {
  var pdfImage = new PDFImage(
    `data/images/${lang}/pdf/game.${lang}.pdf`,
    optionsPDF()
  );

  for (let cardNum = fromCardNum; cardNum <= toCardNum; cardNum++) {
    const pageNum = getCardPage(cardNum);

    // remove  png files
    const pngPath = `data/images/${lang}/pdf/game.${lang}-${pageNum}.png`;
    if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);

    try {
      const imagePath = await pdfImage.convertPage(pageNum);
      console.log("done :" + imagePath);
    } catch (error) {
      console.log("conversion error ", error);
    }
  }
};

function moveAndRenameImages(lang) {
  for (let cardNum = fromCardNum; cardNum <= toCardNum; cardNum++) {
    const pageNum = getCardPage(cardNum);
    const srcPath = `data/images/${lang}/pdf/game.${lang}-${pageNum}.png`;
    if (!fs.existsSync(srcPath)) throw Error(`File ${srcPath} does not exist.`);
    const destPath = `data/images/${lang}/png/${cardNum}.png`;
    if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
    fs.renameSync(srcPath, destPath);
  }
}

function getCardPage(cardNum) {
  switch (cardNum) {
    case 1:
      return 2;
    case 2:
      return 16;
    case 3:
      return 18;
    case 4:
      return 20;
    case 5:
      return 4;
    case 6:
      return 22;
    case 7:
      return 6;
    case 8:
      return 24;
    case 9:
      return 26;
    case 10:
      return 34;
    case 11:
      return 28;
    case 12:
      return 30;
    case 13:
      return 8;
    case 14:
      return 36;
    case 15:
      return 38;
    case 16:
      return 40;
    case 17:
      return 42;
    case 18:
      return 12;
    case 19:
      return 44;
    case 20:
      return 46;
    case 21:
      return 10;
    case 22:
      return 14;
    case 23:
      return 48;
    case 24:
      return 32;
    case 25:
      return 50;
    case 26:
      return 52;
    case 27:
      return 54;
    case 28:
      return 64;
    case 29:
      return 58;
    case 30:
      return 60;
    case 31:
      return 66;
    case 32:
      return 68;
    case 33:
      return 62;
    case 34:
      return 56;
    case 35:
      return 70;
    case 36:
      return 72;
    case 37:
      return 74;
    case 38:
      return 76;
    case 39:
      return 78;
    case 40:
      return 80;
    case 41:
      return 82;
    case 42:
      return 84;
    default:
      throw Error("invalid card " + cardNum);
  }
}

async function convertAllPdfToImg() {
  await convertListOfPdfToImg("fr");
  moveAndRenameImages("fr");
  await convertListOfPdfToImg("en");
  moveAndRenameImages("en");
}

export default convertAllPdfToImg;
