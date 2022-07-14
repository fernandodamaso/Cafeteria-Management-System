import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { VenderComponent } from "./vender/vender.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  animal = "panda";

  openDialog() {
    this.dialog.open(VenderComponent, {
      data: {
        animal: "panda",
      },
    });
  }
}
