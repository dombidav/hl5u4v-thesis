import { Component, OnInit } from '@angular/core'
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular'

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements ViewWillEnter, OnInit{
  ngOnInit() {
    console.log('DashboardComponent.ngOnInit()')
  }

  ionViewWillEnter() {
    console.log('DashboardComponent: ionViewWillEnter')
  }
}
