import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  readonly USERS_KEY: string = "users_list";
  users: User[];

  constructor(private router: Router, private apiService: ApiService, 
    private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    const usersString: string = this.sessionStorageService.getItem(this.USERS_KEY);
    if(usersString) {
      this.users = JSON.parse(usersString);
    }
    else {
      this.apiService.fetchUsers().subscribe((res)=>{
        this.users = res.data;
        this.sessionStorageService.saveItem(this.USERS_KEY, JSON.stringify(this.users));
      }, (err)=>{
        console.log("err", err);
      })
    }
  }

  createUser(): void {
    this.router.navigate(['home/create']);
  }

  editUser(id: string): void {
    this.router.navigate(['home/edit', id]);
  }

  viewUser(id: string): void {
    this.router.navigate(['home/details', id]);
  }

  deleteUser(id: string): void {
    const index: number = this.users.findIndex(user => user.id.toString() == id);
    if(index > -1) this.users.splice(index, 1);
    this.sessionStorageService.saveItem(this.USERS_KEY, JSON.stringify(this.users));
  }

}
