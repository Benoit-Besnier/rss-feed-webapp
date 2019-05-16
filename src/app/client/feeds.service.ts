import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";

import { Feed } from "../entities/Feed";

@Injectable({
  providedIn: "root"
})
export class FeedsClientService {
  private url = "http://localhost:80/feeds";

  constructor(private http: HttpClient) {}

  public getAllFeeds(): Observable<Feed[]> {
    let headers = new HttpHeaders();

    this.setDefaultHeaders(headers);
    return this.http.get<Feed[]>(this.url, { headers: headers });
  }

  public getFeed(id: string, token: string): Observable<Feed> {
    let headers = new HttpHeaders();

    this.setDefaultHeaders(headers);
    this.setAuthorizationHeader(headers, token);
    return this.http.get<Feed>(`${this.url}/${id}`, { headers: headers });
  }

  private setDefaultHeaders(headers: HttpHeaders) {
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
  }

  private setAuthorizationHeader(headers: HttpHeaders, token: string) {
    headers.append("Authorization", `Bearer ${token}`);
  }
}
