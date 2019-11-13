import { session, app } from 'electron'
import AnyProxy from 'anyproxy'
const exec = require('child_process').exec;
let proxyServer = null;
const createServer = () => {
  const options = {
    port: 8001,
    rule: require('./proxyRule'),
    dangerouslyIgnoreUnauthorized: true,
    webInterface: {
      enable: true,
      webPort: 8002
    },
    throttle: 10000,
    forceProxyHttps: true,
    wsIntercept: false, // 不开启websocket代理
    silent: true
  };
  proxyServer = new AnyProxy.ProxyServer(options);
  
  proxyServer.on('ready', () => { 
    const httpsProxy = `http://127.0.0.1:8001,direct://`
    const httpProxy = `http://127.0.0.1:8001,direct://`
    session.defaultSession.setProxy(
      {
        proxyRules: `http=${httpProxy};https=${httpsProxy}`,
      },
      () => console.log(`Proxy listening , upstream proxy http=${httpProxy};https=${httpsProxy}`),
    )
  });
  proxyServer.on('error', (e) => { 
    consolelog('proxyServerError')
   });
  proxyServer.start();
  
}
if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
  AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
        // let users to trust this CA before using proxy
    if (!error) {
      const certDir = require('path').dirname(keyPath);
      console.log('The cert is generated at', certDir);
      const isWin = /^win/.test(process.platform);
      if (isWin) {
        exec('start .', { cwd: certDir });
      } else {
        exec('open .', { cwd: certDir });
      }
    } else {
      console.error('error when generating rootCA', error);
    }
  });
} 

app.closeProxy = () => {
  console.log('close proxy');
  proxyServer && proxyServer.close();
}

app.createServer = () => {
  console.log('new proxy');
  createServer();
}