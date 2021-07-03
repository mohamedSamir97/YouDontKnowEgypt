import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GovernerateService } from 'src/app/services/governerate.service';

@Component({
  selector: 'app-governert',
  templateUrl: './governert.component.html',
  styleUrls: ['./governert.component.css']
})
export class GovernertComponent implements OnInit,OnDestroy {

  constructor(private governrateService:GovernerateService,private route:ActivatedRoute) { }
  id=0;
  locations:any;
  subscription:Subscription|any;
  ngOnInit(): void {
    this.id=+this.route.snapshot.queryParams['governrateId'];
    
    
    this.subscription=this.governrateService.getGovernerateLocations(this.id).subscribe(res=>{
      this.locations=res;
    });
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    
  }
}
