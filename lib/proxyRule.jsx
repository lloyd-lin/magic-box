import { remote, app } from 'electron';
module.exports = {
  // 模块介绍
  summary: 'my customized rule for AnyProxy',
  // 发送请求前拦截处理
   /**
   *
   *
   * @param {object} requestDetail
   * @param {string} requestDetail.protocol
   * @param {object} requestDetail.requestOptions
   * @param {object} requestDetail.requestData
   * @param {object} requestDetail.response
   * @param {number} requestDetail.response.statusCode
   * @param {object} requestDetail.response.header
   * @param {buffer} requestDetail.response.body
   * @returns
   */
  *beforeSendRequest(requestDetail) { 
    if (~requestDetail.url.indexOf('perf.lu.com') && (!~requestDetail.url.indexOf('pharos'))) {
      try {
        magicWindow.webContents.send('http.beforeSendRequest', requestDetail)
      } catch (e) {
        console.log(e);
      }
      console.log('proxyRule',requestDetail.url)
    }
    return null;
  },
  // 发送响应前处理
  *beforeSendResponse(requestDetail, responseDetail) { /* ... */ },
  // 是否处理https请求
  *beforeDealHttpsRequest(requestDetail) { return true },
  // 请求出错的事件
  *onError(requestDetail, error) { /* ... */ },
  // https连接服务器出错
  *onConnectError(requestDetail, error) { /* ... */ }
};  