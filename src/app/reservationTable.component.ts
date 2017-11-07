import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './reservationTable.component.html',
  styleUrls: ['./reservationTable.component.css']
})
export class ReservationTableComponent implements OnInit {
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

  constructor(private db: AngularFireDatabase, private el:ElementRef, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    for (var i = 6; i < 23; i+=0.5) { this.hours.push(Math.floor(i).toString().padStart(2, "0") + ":" + ((i - Math.floor(i)) * 60).toString().padStart(2, "0"));}

    this.firebaseObserver = this.db.object('/rezervace-kurtu/').valueChanges();   
  }

  ngOnInit() {
    this.http.get('https://skym.sk/cron/fb').subscribe(data => {
      console.log("response aktualizace: ");
      console.log(data);      
    });
    this.today = this.route.snapshot.paramMap.get('date');
    // (+) turns the string into a number
    this.priceGroupId = +this.route.snapshot.paramMap.get('priceGroupId');
  }
  
  ngAfterViewInit() {
    setTimeout(this.checkWidth.bind(this), 3000);
  }

  setDate(date) {
    this.today = date;
    this.filterChanged();
  }

  filterChanged() {
    this.router.navigate(['obsazenost', { date: this.today, priceGroupId: this.priceGroupId }]);
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
