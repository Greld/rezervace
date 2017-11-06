import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rezervace-kurtu.cz'; 
  today = moment().format("YYYY-MM-DD"); 
  hours = [];
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
  baseArenaUrl = "https://skym.cz/sportoviste/";
  baseArenaImg = "https://skym.cz/";

  constructor(private db: AngularFireDatabase, private el:ElementRef, private http: HttpClient) {
    for (var i = 6; i < 23; i+=0.5) { this.hours.push(Math.floor(i).toString().padStart(2, "0") + ":" + ((i - Math.floor(i)) * 60).toString().padStart(2, "0"));}

    this.firebaseObserver = this.db.object('/rezervace-kurtu/').valueChanges();   
  }

  ngOnInit() {
    this.http.get('https://skym.sk/cron/fb').subscribe(data => {
      console.log("response aktualizace: ");
      console.log(data);      
    });
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

  isInPast(date, hour) {
    var time = moment(date).hour(parseInt(hour.substr(0,2))).minutes(parseInt(hour.substr(3,2)));
    return (time.isBefore(moment()));
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

  arenaCellClasses(arenaData, today, hour) {
    var isInPast = this.isInPast(today, hour);
    var isClosed = !arenaData.price;
    var classes = {
      'timeSlot': true, 
      'tableCell': true, 
      'full': !isInPast && !isClosed && arenaData.availability == 0, 
      'available': !isInPast && !isClosed && arenaData.availability > 0, 
      'closed': isClosed, 
      'inPast': !isClosed && this.isInPast(today, hour) 
    };
    return classes;
  }

}
