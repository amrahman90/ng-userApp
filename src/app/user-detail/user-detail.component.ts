import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  readonly USERS_KEY: string = "users_list";
  id: string;
  user: User;

  constructor(private route: ActivatedRoute, private apiService: ApiService, 
    private sessionStorageService: SessionStorageService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const users: User[] = JSON.parse(this.sessionStorageService.getItem(this.USERS_KEY));
    const user: User = users.find(user => user.id.toString() == this.id);
    if(user) {
      this.user = user;
    }
    else {
      this.apiService.getUser(this.id).subscribe((res)=>{
        this.user = res.data;
      }, (err)=>{
        console.log("err", err);
      })
    }
  }

}
