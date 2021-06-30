import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiGruppoMeta = environment.apiGruppoMeta;

  private currUserSubject = new BehaviorSubject<User>(undefined);
  currUser = this.currUserSubject.asObservable();

  private usersSubject = new BehaviorSubject<User[]>([{ name: "Luke", lastName: "Skywalker", username: "Luke", password: "skywalker" }]);
  users = this.usersSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  auth(): boolean {
    if (this.currUserSubject.getValue())
      return true;
    return false;
  }

  login(username: string, password: string): boolean {
    let currUser = this.usersSubject.getValue().find(user => user.username === username && user.password === password)
    if (currUser) {
      this.currUserSubject.next(currUser);
      return true;
    }
    return false;
  }

  addUser(user: User) {
    let currUsers = this.usersSubject.getValue();
    currUsers.push(user);
    this.usersSubject.next(currUsers);
  }

  checkUsername(username: string): Observable<any> {
    return this.httpClient.post<any>(this.apiGruppoMeta + "check-username/", '{"username": "'+ username +'"}', httpOptions);
  }

  signIn(user: User): any{
    this.addUser(user);
    return this.httpClient.post<User>(this.apiGruppoMeta + "registration/", user, httpOptions)
  }

  logOut(){
    this.currUserSubject.next(null);
  }
}
