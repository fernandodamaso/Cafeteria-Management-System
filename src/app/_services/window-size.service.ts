import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WindowSizeService {
  constructor() {}

  getWindowSize() {
    if (window.innerWidth > 1024) {
      return "desktop";
    } else {
      return "mobile";
    }
  }
}
