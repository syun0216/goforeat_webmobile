function getWeekDay(date: number) {
  const DATE: Date = new Date(date);
  let weekDay: string | null = null;
  switch (DATE.getDay()) {
    case 0:
      weekDay = '星期日';
      break;
    case 1:
      weekDay = '星期一';
      break;
    case 2:
      weekDay = '星期二';
      break;
    case 3:
      weekDay = '星期三';
      break;
    case 4:
      weekDay = '星期四';
      break;
    case 5:
      weekDay = '星期五';
      break;
    case 6:
      weekDay = '星期六';
      break;
    default:
      weekDay = '';
  }
  return weekDay;
}

export function endDate(endTimestamp: number) {
  const ENDDATE: Date = new Date(endTimestamp);
  let endDateFormat = '截止日期';
  endDateFormat += `${ENDDATE.getHours()}:${ENDDATE.getMinutes()<10?`0${ENDDATE.getMinutes()}`:`${ENDDATE.getMinutes()}`} ${ENDDATE.getMonth()+1}月${ENDDATE.getDate()}日 ${getWeekDay(ENDDATE.getDay())}`;
  return endDateFormat;
}

export function isEmpty(v: any) {
  switch (typeof v) {
    case 'undefined':
      {return true;}
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) {return true;}
      break;
    case 'boolean':
      if (!v) {return true;}
      break;
    // case 'number':
    //   if (0 === v || isNaN(v)) return true;
    //   break;
    // case 'object':
    //   if (null === v || v.length === 0) {return true;}
    //   for (let i in v) {
    //     return false;
    //   }
    //   return true;
  }
  return false;
}