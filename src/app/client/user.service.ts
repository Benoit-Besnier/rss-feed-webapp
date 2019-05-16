import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";

import { UserDetails } from "../entities/UserDetails";

@Injectable({
  providedIn: "root"
})
export class UserClientService {
  private url = "http://localhost:80/users";

  constructor(private http: HttpClient) {}

  public getUserDetails(token: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url}/me`, {
      headers: this.getHttpHeaders(token)
    });
  }

  public putUserDetails(
    token: string,
    details: UserDetails
  ): Observable<HttpResponse<any>> {
    return this.http.put(`${this.url}/me/feeds`, details, {
      headers: this.getHttpHeaders(token),
      observe: "response"
    });
  }

  private getHttpHeaders(token: string): HttpHeaders {
    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);
  }
}
