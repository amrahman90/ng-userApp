import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../model/user';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit {

  readonly USERS_KEY: string = "users_list";
  id: string;
  action: string = "Create";
  actionButton: string = "Create";
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, 
    private sessionStorageService: SessionStorageService) {
    this.id = route.snapshot.paramMap.get('id');
    if(this.id) {
      this.action = "Edit";
      this.actionButton = "Save";
    }
    this.initFormGroup();
  }

  ngOnInit(): void {
  }

  initFormGroup(): void {
    if(this.id) {
      const users: User[] = JSON.parse(this.sessionStorageService.getItem(this.USERS_KEY));
      const user: User = users.find(user => user.id.toString() == this.id);
      if(user) {
        this.form = new FormGroup({
          first_name: new FormControl(user.first_name),
          last_name: new FormControl(user.last_name),
          email: new FormControl(user.email)
        })
      }
      else {
        this.apiService.getUser(this.id).subscribe((res)=>{
          this.form = new FormGroup({
            first_name: new FormControl(res.data.first_name),
            last_name: new FormControl(res.data.last_name),
            email: new FormControl(res.data.email)
          })
        }, (err)=>{
          console.log("err", err);
        })
      }
    }
    else {
      this.form = new FormGroup({
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        email: new FormControl('')
      })
    }
  }

  onClick(): void {
    if(this.id) {
      const users: User[] = JSON.parse(this.sessionStorageService.getItem(this.USERS_KEY));
      const index: number = users.findIndex(user => user.id.toString() == this.id);
      users[index].first_name = this.form.value.first_name;
      users[index].last_name = this.form.value.last_name;
      users[index].email = this.form.value.email;
      this.sessionStorageService.saveItem(this.USERS_KEY, JSON.stringify(users));
    }
    else {
      const users: User[] = JSON.parse(this.sessionStorageService.getItem(this.USERS_KEY));
      let user: User = new User();
      user.id = Math.floor(Math.random()*(999-100+1)+100);
      user.first_name = this.form.value.first_name;
      user.last_name = this.form.value.last_name;
      user.email = this.form.value.email;
      user.avatar = "assets/img/user-icon.png";
      users.push(user);
      this.sessionStorageService.saveItem(this.USERS_KEY, JSON.stringify(users));
    }
    this.router.navigate(['home/users'])
  }

}
