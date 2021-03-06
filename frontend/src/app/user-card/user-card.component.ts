import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserInfo } from "../model/User";
import { RestapiService } from "../restapi.service";
import { RecipeRatingInfo } from "../model/RecipesRatingsInfo";
import { ThemePalette } from "@angular/material/core";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css']
})

export class UserCardComponent implements OnInit {
    activeUser : UserInfo;
    adminAccess : boolean = false;
    selectedUser : UserInfo;
    selectedUserId : string;
    selectedUsersRatings : RecipeRatingInfo[];
    showPasswordUpdateMenu : boolean = false;
    showDifferentPasswordsLabel : boolean = false;
    newPassword : string = '';
    newPasswordVerificatiion : string = '';
    background : ThemePalette = undefined;

    constructor(private route : ActivatedRoute, private service : RestapiService) { this.selectedUserId = route.snapshot.params['id']; }

    ngOnInit() {
        this.service.getUserInfo().subscribe( data => {
            this.activeUser = data;

            for(let role of this.activeUser.roles) {
                if(role == "ADMIN") {
                    this.adminAccess = true;
                }
            }

            if(this.adminAccess) {
                this.service.getUserByAdmin(this.selectedUserId).subscribe( user => {
                    this.selectedUser = user;

                    console.log(this.selectedUser.bday);

                    this.service.getUserReviews(this.selectedUser.login).subscribe(userReviews => {
                        this.selectedUsersRatings = userReviews;
                    });
                });
            }
        });
    }

    removeUserReview(reviewDTO: RecipeRatingInfo) {
        this.service.removeReviewByAdmin(reviewDTO).subscribe( data => {
            this.refreshData();
        });
    }

    showPassUpdMenu() {
        this.showPasswordUpdateMenu = true;
    }

    hidePassUpdMenu() {
        if (!((this.newPassword || this.newPasswordVerificatiion) == '' || (this.newPassword || this.newPasswordVerificatiion) == null)) {
            if (this.newPassword != this.newPasswordVerificatiion) {
                this.showDifferentPasswordsLabel = true;
                this.newPassword = this.newPasswordVerificatiion = '';
            }
            else {
                this.service.updatePasswordByAdmin(this.selectedUser.login, this.newPassword).subscribe( data => {
                    this.showPasswordUpdateMenu = false;
                });
            }
        }
    }

    refreshData() {
        this.service.getUserReviews(this.selectedUser.login).subscribe(userReviews => {
            this.selectedUsersRatings = userReviews;
        });
    }

    disableAdminAccess() {
        return this.service.disableAdminAccess(this.selectedUser.login).subscribe( data => {});
    }
}