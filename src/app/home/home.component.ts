import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    loggedInUser : string
    loggedInUserDetails: string
    constructor(private userService: UserService) { }

    ngOnInit() {

        this.loggedInUserDetails = localStorage.getItem("currentUser")
        var json = JSON.parse(this.loggedInUserDetails);
        this.loggedInUser = json["username"];

        
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}