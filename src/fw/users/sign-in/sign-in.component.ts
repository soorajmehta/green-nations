import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserApi } from "../user-api";

@Component({
  selector: 'fw-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formError: string;
  submitting = false;

  constructor(private userApi : UserApi,
              private router: Router) { }

  onSubmit(signInform: NgForm){
    if(signInform.valid){
      console.log('submitting...',signInform);
      this.submitting = true;
      this.formError = null

      this.userApi.signIn(signInform.value.username,signInform.value.password,signInform.value.rememberMe)
            .subscribe((data) => {
              console.log('valid sign in: ', data);
              this.router.navigate(['/authenticated']);
            },
            (err) => {
              this.submitting = false;
              console.log('error occured ', err);
              this.formError = err;
            });

    }
  }

  ngOnInit() {
  }

}
