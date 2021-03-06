import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class RegisterClientService {
  private url = "http://localhost:80/auth/register";

  constructor(private http: HttpClient) {}

  public getRegisterResponse(
    username: string,
    password: string
  ): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    this.setDefaultHeaders(headers);

    return this.http.post<any>(
      this.url,
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
