import { Component, Inject } from "@angular/core";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogAddFeedData {
  feedUrl: string;
}

@Component({
  selector: "dialog-confirm",
  templateUrl: "dialog-confirm.component.html",
  styleUrls: ["dialog-confirm.component.scss"]
})
export class DialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
