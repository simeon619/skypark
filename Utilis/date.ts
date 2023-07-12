import { isYesterday } from 'date-fns';
import isThisYear from 'date-fns/esm/isThisYear';
import isToday from 'date-fns/esm/isToday';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import fr from 'date-fns/locale/fr';

export const calculeDate = (times: any) => {
  let date_timestamp = new Date(times);
  let time = formatDistance(date_timestamp.setHours(date_timestamp.getHours() - 4), new Date(), {
    // addSuffix: true,

    includeSeconds: true,
    locale: fr,
  });
  return time;
};
export const formatMessageDate = (timestamp: number) => {
  const messageDate = new Date(timestamp * 1000);
  console.log('🚀 ~ file: date.ts:24 ~ formatMessageDate ~ messageDate:', messageDate);

  let formattedDate;

  if (isToday(messageDate)) {
    formattedDate = format(messageDate, 'HH:mm');
  } else if (isYesterday(messageDate)) {
    formattedDate = 'Hier';
  } else if (isThisYear(messageDate)) {
    formattedDate = format(messageDate, 'dd/MM');
  } else {
    formattedDate = format(messageDate, 'dd/MM/yyyy');
  }

  return formattedDate;
};
export const formatPostDate = (timestamp: Date | string) => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);

  const diffInSeconds = Math.floor((currentDate.getTime() - messageDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconde${diffInSeconds !== 1 ? 's' : ''}.`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}.`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} heure${diffInHours !== 1 ? 's' : ''}.`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays} jour${diffInDays !== 1 ? 's' : ''}.`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `${diffInWeeks} semaine${diffInWeeks !== 1 ? 's' : ''}.`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `${diffInMonths} mois.`;
  }

  const diffInYears = Math.floor(diffInDays / 365);

  return `${diffInYears} an${diffInYears !== 1 ? 's' : ''}.`;
};
