"use strict";
import { observable, action, configure, runInAction } from 'mobx';

class UrlStore {
  @observable urlGroup = [];

  @action.bound 
  appendUrl(url) {
    urlGroup = urlGroup.concat(urlGroup, [url]);
  }
}

export default UrlStore;