import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/interfaces/icategory';
import { Icomment } from 'src/app/interfaces/icomment';
import { IGovernrate } from 'src/app/interfaces/igovernrate';
import { IUser } from 'src/app/interfaces/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { GovernerateService } from 'src/app/services/governerate.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit,OnDestroy,OnChanges {

  constructor(private locationService:LocationService,private route:ActivatedRoute ,public authService:AuthService,private router :Router,private commentService:CommentService,private categoryService:CategoryService,private governerateService:GovernerateService,private userService:UserService
    ) { }
  id=0;
  location:any;
  locations:any;
  locationImages:any;
  subscription:Subscription|any;
  postedComment="";
  category:any;
  governerate:any;
  comment:Icomment={};
  comments:Icomment[]|any=[];
  ngOnInit(): void {
    this.category="";
    this.governerate="";
    this.id=+this.route.snapshot.queryParams['locationId'];
    this.subscription=this.locationService.getLocationById(this.id).subscribe(res=>{
      this.location=res;
      console.log(res);
      
      this.categoryService.getCategoryById(this.location.categoryId).subscribe((res:ICategory)=>{this.category=res.name;console.log(res);
      });
      this.governerateService.getGovernerteById(this.location.governorateId).subscribe((res:IGovernrate)=>this.governerate=res.name);
    });
    this.locationService.increaseCount(this.id).subscribe(res=>{}
    )
    this.locationService.getLocationImagesById(this.id).subscribe(res=>{this.locationImages=res;
    });
    this.commentService.getLocaionComments(this.id).subscribe((res:Icomment[]|any)=>{this.comments=res;
    }
    )
    
    
  }
ngOnChanges(){
  
}
  postComment(){
    console.log(this.postedComment);

    this.comment.comment1=this.postedComment;
    this.comment.userId=this.authService.user.id;
    this.comment.locatoinId=this.location.id;
    console.log(this.comment);
    this.commentService.postComment(this.comment).subscribe(res=>{
      console.log(res);
      this.postedComment="";
    window.location.reload();
    })
    
  }
  delete(){
    console.log(this.id);

    this.locationService.deleteLocation(this.id).subscribe(res=>console.log(res)
    );
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

