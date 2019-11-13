import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { string } from 'prop-types';
import TrackPanel from '../renderer/trace-panel/track'
import { Provider } from 'mobx-react';

import { observer, inject } from 'mobx-react';
import { urlStoreMessageListenerInit } from '../utils/data-reslover'
import Store from '../utils/store'
import './homepage.scss';

const urlStore = new Store.UrlStore();
urlStoreMessageListenerInit((url) => {
  urlStore.appendUrl(url);
});

const WebView = require('react-electron-web-view')


const ChannelContainer = styled.div`
  display:flex;
`

const ChannelView = styled.div`
    width: 395px;
    height: 832px;
  `
  const ChannelPlugin = styled.div`
  display: block;
  flex: 1;
  color: red;
`
@inject('urlStore')
@observer
class MyApp extends React.Component {
  webview = React.createRef()

  state = {
    url: 'https://m.lu.com/pachannel/home#/',
    key: 0,
  }

  render() {
    return <ChannelContainer>
      <ChannelView>
        <WebView className="channel-webview" src={this.state.url} key={'key'} ref={this.webview} style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }} onDidAttach={()=> {
          console.log('Did attach')
          }}>
        </WebView>
      </ChannelView>
      <ChannelPlugin>
          <TrackPanel urlGroup={this.props.urlStore.urlGroup}></TrackPanel>
          {/* {this.props.urlStore.urlGroup.join(',')} */}
      </ChannelPlugin>
    </ChannelContainer>
  }
}


ReactDOM.render(
  <Provider urlStore = {urlStore}>
    <MyApp />
  </Provider>, 
document.getElementById('app'));