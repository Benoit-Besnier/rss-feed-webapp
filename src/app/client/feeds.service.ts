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
    return this.http.get<Feed[]>(this.url, {
      headers: this.getBasicHttpHeaders()
    });
  }

  public getFeed(id: string, token: string): Observable<Feed> {
    return this.http.get<Feed>(`${this.url}/${id}`, {
      headers: this.getAuthentiticationHttpHeaders(token)
    });
  }

  public postFeed(
    urlFeed: string,
    token: string
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.url,
      { url: urlFeed },
      {
        headers: this.getAuthentiticationHttpHeaders(token),
        observe: "response"
      }
    );
  }

  public deleteFeed(uuid: string, token: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${uuid}`, {
      headers: this.getAuthentiticationHttpHeaders(token)
    });
  }

  private getAuthentiticationHttpHeaders(token: string): HttpHeaders {
    return this.getBasicHttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  private getBasicHttpHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Access-Control-Allow-Origin", "*");
  }
}
