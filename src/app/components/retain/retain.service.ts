import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetainService {
  retainSubject: Subject<any>

  subscribe(){
    this.retainSubject.next()
  }

  constructor() {
    this.retainSubject = new Subject<any>();
  }
}
