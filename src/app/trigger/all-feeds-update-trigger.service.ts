import { Injectable, EventEmitter, Output } from "@angular/core";

import { Feed } from "../entities/Feed";

@Injectable({
  providedIn: "root"
})
export class AllFeedsUpdateTriggerService {
  @Output() update: EventEmitter<boolean> = new EventEmitter();
}
