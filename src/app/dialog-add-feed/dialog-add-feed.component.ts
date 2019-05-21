import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogAddFeedData {
  feedUrl: string;
}

@Component({
  selector: "dialog-add-feed-component",
  templateUrl: "dialog-add-feed.component.html",
  styleUrls: ["dialog-add-feed.component.scss"]
})
export class DialogAddFeedComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddFeedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAddFeedData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
