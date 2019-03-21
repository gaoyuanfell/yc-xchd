import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MokaTableService {
  retainSubject: Subject<any>;

  subscribe(){
    this.retainSubject.next()
  }

  constructor() {
    this.retainSubject = new Subject<any>();
  }
}
