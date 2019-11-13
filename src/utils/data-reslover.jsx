import {
  ipcRenderer
} from 'electron'
export const urlStoreMessageListenerInit = (dealWithMessage) => {
  ipcRenderer.on('http.beforeSendRequest', (event, responseDetail) => {
    dealWithMessage(responseDetail.url);
  });
}