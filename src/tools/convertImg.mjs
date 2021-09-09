// @ts-ignore
import convertAllPdfToImg from "./pdfToImg2.mjs";
// @ts-ignore
import convertAllImgToWebp from "./imgToWebp.mjs";
// @ts-ignore
import fs from "fs";

// @ts-ignore
async function convertToImg() {
  await convertAllPdfToImg();
  await convertAllImgToWebp();
}

convertToImg().then(() => console.log("conversion completed"));
