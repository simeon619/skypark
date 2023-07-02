import { isYesterday } from "date-fns";
import isThisYear from "date-fns/esm/isThisYear";
import isToday from "date-fns/esm/isToday";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import fr from "date-fns/locale/fr";

export const calculeDate = (times: any) => {
  let date_timestamp = new Date(times);
  let time = formatDistance(
    date_timestamp.setHours(date_timestamp.getHours() - 4),
    new Date(),
    {
      // addSuffix: true,

      includeSeconds: true,
      locale: fr,
    }
  );
  return time;
};
export const formatMessageDate = (timestamp: number) => {
  const messageDate = new Date(timestamp * 1000);
  console.log(
    "🚀 ~ file: date.ts:24 ~ formatMessageDate ~ messageDate:",
    messageDate
  );

  let formattedDate;

  if (isToday(messageDate)) {
    formattedDate = format(messageDate, "HH:mm");
  } else if (isYesterday(messageDate)) {
    formattedDate = "Hier";
  } else if (isThisYear(messageDate)) {
    formattedDate = format(messageDate, "dd/MM");
  } else {
    formattedDate = format(messageDate, "dd/MM/yyyy");
  }

  return formattedDate;
};
