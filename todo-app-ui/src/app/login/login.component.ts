import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'jitin';
  password = '153';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  //constructor(private router: Router, private hardcodedAuthenticationService: HardcodedAuthenticationService) { }
  constructor(private router: Router, private basicAuthenticationService: BasicAuthenticationService) { }
  ngOnInit() {
  }

  //--Method to test hardcoded authentication.
  // doLogin() {
  //   if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
  //     this.router.navigate(['welcome', this.username]);
  //     //this.invalidLogin = false;
  //   } else {
  //     this.invalidLogin = true;
  //   }
  // }

  //--Method to test basic authentication.
  doLoginWithBasicAuth() {
    this.basicAuthenticationService.executeBasicAuthService(this.username, this.password)
      .subscribe(
        response => {
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      );
  }
}
