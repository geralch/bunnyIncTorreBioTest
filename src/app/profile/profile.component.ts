import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../services/http-calls.service';
import { NgxLinkedinService } from 'ngx-linkedin';
import { Router, ActivatedRoute } from '@angular/router';
import * as Parallax from 'parallax-js'
declare var Parallax: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile : any = {}; 
  constructor(private service: HttpCallsService,
    private router: Router, 
    private route: ActivatedRoute, 
    private ngxLinkedinService: NgxLinkedinService) { 
    console.log(this.route.snapshot.paramMap.get('torreBioId'));
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    
  }

  loginLinkedin() {
    this.ngxLinkedinService.signIn().subscribe(user => {
        console.log(user);
        this.service.postRequest(user, '/linkedin/getInformation').then(response => {
          console.log(response);
        })
    });
  }

}
