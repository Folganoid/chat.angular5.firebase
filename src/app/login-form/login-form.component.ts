import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {User} from "firebase";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    email: string;
    password: string;
    errorMsg: string;
    user: any;

    constructor(private authService: AuthService, private router: Router) {
    }



    logIn(){

        const password = this.password;
        const email = this.email;
        this.authService.login(email, password)
            .then(resolve => this.router.navigate(['chat']))
            .catch(error => this.errorMsg = error.message)
    }

  ngOnInit() {
  }

}
