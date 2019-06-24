import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
 public user:any;
  public appPages = [
    {
      title: 'Budget Dashboard',
      url: '/tabs',
      icon: 'tabs'
    },
    {
      title: 'Payback',
      url: '/payback',
      icon: 'payback'
    }, {
      title: 'Log Out',
      url: '/logout',
      icon: 'payback'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    private router:Router


  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkAuthStatus();
    });
  }

  checkAuthStatus(){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        console.log(user.email);
        this.user = user;
        this.router.navigate(['/tabs']);
        //update navigation for logged in user
        this.appPages = [
          {
            title: 'Budget Dashboard',
            url: '/tabs',
            icon: 'tabs'
          },
          {
            title: 'Payback',
            url: '/payback',
            icon: 'payback'
          }, {
            title: 'Log Out',
            url: '/logout',
            icon: 'payback'
          }
        ];
      }
      else{
        this.user = null;
        this.router.navigate(['/login']);
        //update navigation for not authed user
        this.appPages = [
          {
            title: 'Log in',
            url: '/login',
            icon: 'login'
          }
        ];
      }
    });
  }

}

