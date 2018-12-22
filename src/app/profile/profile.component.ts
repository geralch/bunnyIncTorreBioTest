import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../services/http-calls.service';
import { NgxLinkedinService } from 'ngx-linkedin';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public torreBioUserId = '';
  public profile : any = {
    name: '',
    summaryOfBio: '',
    picture: '',
    professionalHeadline: '',
    location: '',
    weight: 0,
    aspirations: [],
    education: [],
    jobs: [],
    stats: {
      achievements: 0,
      aspirations: 0,
      education: 0,
      jobs: 0,
      strengths: 0,
      projects: 0
    },
    strengths: []
  }; 
  constructor(private service: HttpCallsService,
    private router: Router, 
    private route: ActivatedRoute, 
    private ngxLinkedinService: NgxLinkedinService) { 
    this.torreBioUserId = this.route.snapshot.paramMap.get('torreBioId');
  }

  ngOnInit() {
    this.service.postRequest({id: this.torreBioUserId}, '/torrebio/getBio').then(response => {
      if(response) {
        if(response[0]){
          if(response[0].code){
            this.router.navigate(['/']);
          }
        } else {
          this.setInfoForProfiles(response)
        }
      }
    })
    .catch(error => {
      console.log(error);
      this.router.navigate(['/']);
    })
  }

  setInfoForProfiles(profile){
    this.profile.name = profile.person.name
    this.profile.summaryOfBio = profile.person.summaryOfBio
    this.profile.picture = profile.person.picture
    this.profile.professionalHeadline = profile.person.professionalHeadline
    this.profile.location = profile.person.location
    this.profile.weight = profile.person.weight
    this.profile.projects = profile.person.name
    this.profile.aspirations = profile.aspirations
    this.profile.education = profile.education
    this.profile.jobs = profile.jobs
    this.profile.stats.aspirations = profile.stats.aspirations
    this.profile.stats.education = profile.stats.education
    this.profile.stats.jobs = profile.stats.jobs
    this.profile.stats.strengths = profile.stats.strengths
    this.profile.strengths = profile.strengths
  }

  goToHome(){
    this.router.navigate(['/']);
  }

  loginLinkedin() {
    this.ngxLinkedinService.signIn().subscribe(user => {
        console.log(user);
        const params = {
          id: this.torreBioUserId,
          data: user
        }
        //this.service.postRequest(user, '/torrebio/mergeInfo').then(response => {
        //  console.log(response);
        //})
    });
  }
}
