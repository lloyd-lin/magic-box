"use strict";
import { observable, action, configure } from 'mobx';
configure({ enforceActions: 'observed' })
class UrlStore {
  @observable urlGroup = [];
  @action.bound 
  appendUrl(url) {
    this.urlGroup = this.urlGroup.concat([url]).reverse();
  }
}
const store = {
  UrlStore,
}
export default store;

  