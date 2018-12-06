export function getDeviceInfo() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
  const val = isiOS ? 'ios' : isAndroid ? 'android' : 'none';
  return val;
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