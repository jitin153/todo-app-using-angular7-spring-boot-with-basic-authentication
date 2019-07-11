import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name='';
  messageFromBackend='';
  constructor(private route:ActivatedRoute, private welcomeDataService:WelcomeDataService) { }

  ngOnInit() {
    this.name=this.route.snapshot.params['name'];
  }
  getMessage(){
    this.welcomeDataService.getMessageFromBackend().subscribe(response=>this.handleResponse(response),error=>this.handleError(error));
  }

  getMessageWithPathVariable(){
    this.welcomeDataService.getMessageFromBackendWithPathVariable(this.name).subscribe(response=>this.handleResponse(response),error=>this.handleError(error));
  }

  handleResponse(response){
    this.messageFromBackend=response.message;
  }

  handleError(error){
    this.messageFromBackend=error.error.message;
  }
}
