import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  saveItem(key: string, value: string) {
    sessionStorage.setItem(key, value)
  }
}
