import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  sharedVariable!: boolean

  updateSharedVariable(newValue: boolean) {
    this.sharedVariable = newValue;
  }
}
