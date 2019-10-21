import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private apiService: ApiService) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.apiService.login(this.form.value.email, this.form.value.password).subscribe((res)=>{
      if(res) {
        sessionStorage.setItem('userToken', res.token);
        this.router.navigate(['/home']);
      }
    },(err)=>{
      console.log("err", err);
    })
  }

}
