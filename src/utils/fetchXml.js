import { parseStringPromise } from "xml2js";

export async function fetchAndParseXml(url) {
  try {
    const response = await fetch(url);
    const xmlText = await response.text();

    // Parse XML into JavaScript object
    const parsedXml = await parseStringPromise(xmlText);
    return parsedXml;
  } catch (error) {
    console.error("Error fetching or parsing XML:", error);
    return null;
  }
}
