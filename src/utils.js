/**
 *
 * @param {String} imageName The image file name.
 * @returns The image file url in folder "assets".
 */
export function getImage(imageName) {
  return new URL(`./assets/${imageName}`, import.meta.url).href;
}

export const url = new URL("/api/", "https://star.fhsh.tp.edu.tw").href;
// export const url = new URL("http://203.72.59.154:8000").href;
// export const url = new URL("http://localhost:8000").href;

export const openTime = {
  start: new Date("2022/2/1").getTime(),
  end: new Date("2022/3/14 09:01").getTime(),
};

export const updateAspiredExpiredTime = new Date("2022/03/11 17:00");

export const starApplyExpiredTime = new Date("2022/03/09 09:01");

export const isUpdateAspiredOpenTime = (expiredTime) => {
  const now = new Date();
  if (now.getTime() > expiredTime.getTime()) {
    return false;
  }
  return true;
};
