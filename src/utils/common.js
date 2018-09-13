export function getWeekDay(date) {
  let _date = new Date(date);
  let _week_day = null;
  switch (_date.getDay()) {
    case 0:
      _week_day = '星期日';
      break;
    case 1:
      _week_day = '星期一';
      break;
    case 2:
      _week_day = '星期二';
      break;
    case 3:
      _week_day = '星期三';
      break;
    case 4:
      _week_day = '星期四';
      break;
    case 5:
      _week_day = '星期五';
      break;
    case 6:
      _week_day = '星期六';
      break;
    default:
      _week_day = '';
  }
  return _week_day;
}

export function formatDate(timestamp) {
  let _Date = new Date(timestamp);
  let _date_format = [_Date.getMonth()+1 < 10 ? `0${_Date.getMonth()+1}`:_Date.getMonth()+1 ,
    _Date.getDate() < 10 ? `0${_Date.getDate()}`:_Date.getDate(),_Date.getFullYear()].join('-');
  return _date_format;
}

export function endDate(endTimestamp) {
  let _endDate = new Date(endTimestamp);
  let _endDate_format = '截止日期';
  _endDate_format += ` ${_endDate.getHours()}:${_endDate.getMinutes()<10?`0${_endDate.getMinutes()}`:`${_endDate.getMinutes()}`} ${_endDate.getMonth()+1}月${_endDate.getDate()}日 ${getWeekDay(_endDate.getDay())}`;
  return _endDate_format;
}