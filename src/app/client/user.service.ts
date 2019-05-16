import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";

import { UserDetails } from "../entities/UserDetails";

@Injectable({
  providedIn: "root"
})
export class UserClientService {
  private url = "http://localhost:80/users";

  constructor(private http: HttpClient) {}

  public getUserDetails(token: string): Observable<UserDetails> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    return this.http.get<UserDetails>(`${this.url}/me`, { headers: headers });
  }
}
