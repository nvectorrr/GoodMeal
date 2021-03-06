import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipeRating } from "../model/RecipeRating";

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
    recipeId : number;
    userLogin : string;

    constructor(private route : ActivatedRoute, private service : RestapiService, private router : Router) {
        this.recipeId = route.snapshot.params['id'];
    }

    ngOnInit() {
        this.service.getUserdata().subscribe( data => {
            this.userLogin = data.username;
        });
    }

    public addReview(addForm: NgForm): void {
        addForm.controls['recipeId'].setValue(this.recipeId)
        addForm.controls['userLogin'].setValue(this.userLogin);
        this.service.addRating(addForm.value).subscribe(
            (response: RecipeRating[]) => {
                this.Close();
            },
            (error: HttpErrorResponse) => {
                console.log(error)
            }
        );
    }

    Close() {
        this.router.navigate(['/recipe-card/' + this.recipeId.toString()]);
    }
}