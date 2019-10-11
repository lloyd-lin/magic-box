import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { string } from 'prop-types';
const WebView = require('react-electron-web-view')
// import './homepage.scss';

const ChannelContainer = styled.div`
  display:flex;
`

const ChannelView = styled.div`
    width: 375px;
    height: 812px;
  `
  const ChannelPlugin = styled.div`
  background-color:black;
  display: block;
  flex: 1;
`

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
      </ChannelPlugin>
    </ChannelContainer>
  }
}


ReactDOM.render(<MyApp />, document.getElementById('app'));