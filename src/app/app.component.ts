import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
 
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
      url: '/login',
      icon: 'payback'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
