import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  private url = '';

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.apiUrl;
  }

  private handleError(error: any) {
    console.error('An error occurred', error); 
    return error.error
  }

  protected setHeaders() {
    if (localStorage.getItem('Authorization') != null) {
      this.headers = this.headers.set('Authorization', localStorage.getItem(('Authorization')));
    }
  }

  public getRequest(parameters: any, path: string = ''): Promise<any[]> {
    this.setHeaders();
    const params = new HttpParams();
    return this.http.get(this.url + path, { headers: this.headers , params })
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch(error => {
        return [this.handleError(error)];
      });
  }

  // TODO See how to send objects
  public postRequest(parameters: any, path: string = ''): Promise<any[]> {
    return this.http.post(this.url + path, parameters, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch(error => {
        return [this.handleError(error)];
      });
  }
}
