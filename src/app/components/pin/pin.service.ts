/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:12:01
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:12:01
 */
import { Injectable } from "@angular/core";
import { PinDirective } from "./pin.directive";

@Injectable()
export class PinService {
  constructor() {}

  pinList: Array<PinDirective> = [];

  add(data) {
    this.pinList.push(data);
  }

  remove(data) {
    const index = this.pinList.findIndex(p => p === data);
    if (index !== -1) {
      this.pinList.splice(index, 1);
    }
  }

  subscribe() {
    this.pinList.forEach(p => {
      p.subscribeChange();
    });
  }
}
