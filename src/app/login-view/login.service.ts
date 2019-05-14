import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { UserSession } from "../entities/UserSession";

@Injectable({
  providedIn: "root"
})
export class LoginClientService {
  constructor(private http: HttpClient) {}

  public getLoginResponse(
    username: string,
    password: string
  ): Observable<HttpResponse<UserSession>> {
    let headers = new HttpHeaders();
    this.setDefaultHeaders(headers);

    return this.http.post<UserSession>(
      "http://localhost:80/auth/signin",
      {
        username: username,
        password: password
      },
      { headers: headers, observe: "response" }
    );
  }

  private setDefaultHeaders(headers: HttpHeaders) {
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
  }
}
