import React from 'react'
import { getUrlSearchArray } from '../../utils/urlUtil';
import { Descriptions } from 'antd';
import './track.scss';

const trackKeyDict = {
  'category': '页面',
  'pointType': '埋点种类',
  'otag_channel': '渠道',
  'otag_source': '来源',
  'click': '事件类型',
};

const trackValueDict = {
  'screen': '页面加载',
  'event': '事件触发',
  '0': '曝光',
  '1': '点击'
}
class TrackPanel extends React.Component {
  render() {
    return <div className="track-panel">
        { this.props.urlGroup.map((url, index) => {
          let traceInfo = getUrlSearchArray(decodeURIComponent(url));
          let officalList = [];
          let customerList = [];
          Object.keys(traceInfo).map((key) => {
            if (trackKeyDict[key]) {
              officalList.push({
                [key]: traceInfo[key]
              })
            } else {
              customerList.push({
                [key]: traceInfo[key]
              })
            }
          });
          return <Descriptions title=" " bordered key={index}>
            <Descriptions.Item label="通用埋点" span={3} key="normal">
            { officalList.map((traceObj, index) => {
              return (
            <p key={index}>{trackKeyDict[Object.keys(traceObj)[0]]}: {trackValueDict[traceObj[Object.keys(traceObj)[0]]] || traceObj[Object.keys(traceObj)[0]]}</p>
              )
            })}
            </Descriptions.Item>
            <Descriptions.Item label="附加信息" span={3} key="extra">
            { customerList.map((traceObj, index) => {
              return (
                <p key={index}>{Object.keys(traceObj)[0]}:{traceObj[Object.keys(traceObj)[0]]}</p>
              )
            })}
            </Descriptions.Item>
         </Descriptions> 
        })}
    </div>
  }
}

export default TrackPanel;

