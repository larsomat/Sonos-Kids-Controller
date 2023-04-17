import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ParentalConfig {
  hasPlaytime: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ParentalService {

  private config: Observable<ParentalConfig> = null;

  constructor(private http: HttpClient) {}

  getConfig(): Observable<ParentalConfig> {
    if (!this.config) {
      const url = 'http://localhost:7005/playtime';

      this.config = this.http.get<ParentalConfig>(url);
    }

    return this.config;
  }

  hasPlaytime(): Observable<boolean> {
    return this.getConfig().pipe(
      map(config => config.hasPlaytime)
    );
  }

}
