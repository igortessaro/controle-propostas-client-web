import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    baseUrl: string = 'http://localhost:50480/api/login';

    login(username: string, password: string) {
        return this.http.post<any>(this.baseUrl, { login: username, senha: password })
            .pipe(map((res: any) => {
                console.log(res);

                // login successful if there's a jwt token in the response
                if (res && res.accessToken) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, password, token: res.accessToken }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    logged() {
        return localStorage.getItem('currentUser') != null;
    }
}