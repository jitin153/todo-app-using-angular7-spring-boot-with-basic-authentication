import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/app.constants';

export class HiMessage{
  constructor(public message:String) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http:HttpClient) { }

  getMessageFromBackend(){
   return this.http.get<HiMessage>(`${BASE_URL}/sayhello`);
  }

  getMessageFromBackendWithPathVariable(name){
    // let basicAuthHeaderString=this.createBasicAuthenticationHttpHeader();
    // let headers=new HttpHeaders({
    //   Authorization:basicAuthHeaderString
    // });
    // return this.http.get<HiMessage>(`http://localhost:8090/sayhello/${name}`,{headers});
    return this.http.get<HiMessage>(`${BASE_URL}/sayhello/${name}`);
   }

  //  createBasicAuthenticationHttpHeader(){
  //    let username='jitin';
  //    let password='153';
  //    let basicAuthHeaderString='Basic '+window.btoa(username+':'+password);
  //    return basicAuthHeaderString;
  //  }
}
