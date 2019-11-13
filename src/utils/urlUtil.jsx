


import urlUtil from 'url'

export const getUrlSearchArray = (url) => {
  let search = urlUtil.parse(url).search;
  search = search.split ('?' );
  const param = {};
  if (typeof (search[1]) == 'string' ) {
      search = search[1].split ('&');
      search.forEach((ele) => {
        const res = ele.split('=');
        param[res[0]]= res[1];
      })
  }
  return param;
}