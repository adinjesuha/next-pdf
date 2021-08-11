import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import GeneratePDF from '../../components/GeneratePDF'

export default async function handler(_req, res) {
  try {
    const pdfStream = await renderToStream(<GeneratePDF />);
    res.setHeader("Content-Type", "application/pdf");
    pdfStream.pipe(res);
    pdfStream.on("end", () => console.log("Done streaming, response sent."));
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
}
