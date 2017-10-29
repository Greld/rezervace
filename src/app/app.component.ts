import { Component, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rezervace'; 
  today = new Date().toJSON().slice(0,10);
  hours = [];
  db: AngularFireDatabase;
  priceGroups = [{
    id: 1,
    name: "Dospělí"
  }, {
    id: 2,
    name: "Studenti"
  }];
  priceGroupId = this.priceGroups[0].id;
  firebaseObserver: Observable<any>;
  firstColumnFixed = false;
  el:ElementRef;
  baseArenaUrl = "https://skym.cz/sportoviste/";
  baseArenaImg = "https://skym.cz/";

  constructor(db: AngularFireDatabase, el:ElementRef) {
    this.db = db;
    this.el = el;
    for (var i = 6; i < 23; i+=0.5) { this.hours.push(Math.floor(i).toString().padStart(2, "0") + ":" + ((i - Math.floor(i)) * 60).toString().padStart(2, "0"));}

    this.firebaseObserver = this.db.object('/rezervace-kurtu/').valueChanges();   
  }
  
  ngAfterViewInit() {
    setTimeout(this.checkWidth.bind(this), 3000);
  }

  setDate(date) {
    this.today = date;
  }

  getReservationUrl(arenaId, date) {
    return this.baseArenaUrl + "?id=" + arenaId + "&sport=0&date=" + date;
  }

  checkWidth() {
    var tableWidth = this.el.nativeElement.querySelector(".reservationTable").clientWidth;
    var boxWidth = this.el.nativeElement.querySelector(".reservationBox").clientWidth;
    if (tableWidth > boxWidth) {
      this.firstColumnFixed = true;
    } else {
      this.firstColumnFixed = false;
    }
  }

}
