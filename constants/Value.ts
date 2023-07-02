import { IconName } from "../store/preference";

export const HEIGHT_BOTTOM = 55;

export const MEDIUM_PIC_USER = 45;
export const LARGE_PIC_USER = 69;
export const SMALL_PIC_USER = 28;

export const formTextPlaceholder = (str: IconName) => {
  if (str === "Vote" || str === "Sondage") {
    return `Ask your Question, Asemai?`;
  } else {
    return `What's new, Asemai?`;
  }
};
