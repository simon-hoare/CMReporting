import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, map,filter, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiVersionChannel } from './ApiVersionChannel';
import { ApiVersionItem } from './ApiVersionItem';
import { API } from './API';
import { ApiConnectedAppsChannel } from './ApiConnectedAppsChannel';
import { ApplicationVersionChannel } from './ApplicationVersionChannel'; 
import { AppVersionApiVersionMetrics } from './AppVersionApiVersionMetrics';
import { Application } from './application';
import { AppMembers } from './AppMembers';
import { ApiOperations } from './ApiOperations';

@Injectable({
  providedIn: 'root'
})
export class CMAPisService {
  CMHost:string = 'https://apiportal.mayo.edu';

  constructor( private http: HttpClient) { }

  getAPIVersions(): Observable<HttpResponse<ApiVersionChannel>> { 
    const url = this.CMHost + '/api/apis/versions';  
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<ApiVersionChannel>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }

  getAPIVersionOperations(api:API): Observable<HttpResponse<ApiOperations>> { 
    const url = this.CMHost + '/api/apis/versions/' + api.versionID + '?includeOperations=true';  
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<ApiOperations>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }


  getConnectedApps(api:API): Observable<HttpResponse<ApiConnectedAppsChannel>> { 
    const url = this.CMHost + '/api/apis/versions/' + api.versionID + '/connectedapps';  
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<ApiConnectedAppsChannel>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }

  getAppVersions(appId): Observable<HttpResponse<ApplicationVersionChannel>> { 
    const url = this.CMHost + '/api/apps/' + appId + '/versions';  
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<ApplicationVersionChannel>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }

  
  getAppVersionMetrics(appVersionId, apiVersionID, start, end): Observable<HttpResponse<AppVersionApiVersionMetrics>> { 

    const url = this.CMHost + '/api/apps/versions/' + appVersionId + '/metrics?ApiVersionID=' + apiVersionID +  '&StartDate=' + start + '&EndDate=' + end + '&TimeInterval=1w&ShowSummary=true&Environment=Production&ShowIntervalData=false';
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<AppVersionApiVersionMetrics>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }

  getAppVersionMetricsByOperation(appVersionId, apiVersionID, operationName, start, end): Observable<HttpResponse<AppVersionApiVersionMetrics>> { 

    const url = this.CMHost + '/api/apps/versions/' + appVersionId + '/metrics?ApiVersionID=' + apiVersionID + '&OperationName=' + operationName + '&StartDate=' + start + '&EndDate=' + end + '&TimeInterval=1w&ShowSummary=true&Environment=Production&ShowIntervalData=false';
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<AppVersionApiVersionMetrics>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }

  getAppTeamMembers(appId): Observable<HttpResponse<AppMembers>> { 

    const url = this.CMHost + '/api/apps/' + appId + '/members';
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.get<AppMembers>(url, {headers: httpHeaders, observe: 'response', withCredentials: true})
   .pipe(
    catchError(this.handleError)
    );
  }

  LoginCM( username, password): Observable<HttpResponse<Object>> { 
    const url = this.CMHost + '/api/login';  
    const requestbody = "{\"email\": \"" + username + "\", \"password\":\"" + password + "\"}"; 
    let httpHeaders  = new HttpHeaders().set ('Content-Type', 'application/json' );
    httpHeaders.set('Accept', 'application/json');
   return this.http.post<HttpResponse<Object>>(url, requestbody, {headers: httpHeaders, withCredentials:true, observe: 'response'})
   .pipe(
    catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
    
  };
}
