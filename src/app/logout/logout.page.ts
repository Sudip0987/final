import { AuthenticateService } from './../services/authentication.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
  ) { 
    
  }

  ngOnInit() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/login');
    }, err => {
    })
  }

}
