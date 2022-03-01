/**
 *
 * @param {String} imageName The image file name.
 * @returns The image file url in folder "assets".
 */
export function getImage(imageName) {
  return new URL(`./assets/${imageName}`, import.meta.url).href;
}

// export const url = new URL("/api/", "https://star.fhsh.tp.edu.tw").href;
export const url = new URL("http://203.72.59.154:8000").href;
// export const url = new URL("http://localhost:8000").href;
