import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallsService } from '../services/http-calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public torreBioUserId = '';
  public errorText = '';
  public validation = {
    torreBioId: true
  };

  constructor(private service: HttpCallsService, private router: Router) { }

  ngOnInit() {
  }

  goToProfile() {
    if(this.torreBioUserId){
      this.service.postRequest({id: this.torreBioUserId}, '/torrenegra/getBio').then(response => {
        if(response) {
          if(response[0]){
            if(response[0].code){
              this.validation.torreBioId = false;
              this.errorText = "The torre bio id don't exist"
            }
          } else {
            this.validation.torreBioId = true;
            this.router.navigate(['/profile',this.torreBioUserId]);
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
    }else{
      this.validation.torreBioId = false;
      this.errorText = "The torre bio id can't be empty"
    }
  }
}
