import { Component } from '@angular/core';
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
  arenas: [{
    id: number,
    name: String,
    skymUrl: String,
    hours: Observable<any[]>
  }]; 
  hours = [];
  defaultDate: Date;
  db: AngularFireDatabase;
  priceGroups = [{
    id: 1,
    name: "Dospělí"
  }, {
    id: 2,
    name: "Studenti"
  }];
  priceGroupId = this.priceGroups[0].id;

  constructor(db: AngularFireDatabase) {
    this.db = db;
    for (var i = 6; i < 23; i+=0.5) { this.hours.push(Math.floor(i).toString().padStart(2, "0") + ":" + ((i - Math.floor(i)) * 60).toString().padStart(2, "0"));}
    this.setRezervationData();    
  }

  setDate(date){
    this.today = date;
    this.setRezervationData();
  }

  setRezervationData(){
    this.arenas = [{
      id: 1,
      name: "Sprint", 
      skymUrl: "https://badminton.skym.cz/sportoviste/sprint/",
      hours: this.db.list('/court-availability/' + this.today + '/1').valueChanges()
    },{
      id: 98,
      name: "CESA VUT tělocvična Purkyňova", 
      skymUrl: "https://badminton.skym.cz/sportoviste/cesa-vut-telocvicna-purkynova/",
      hours: this.db.list('/court-availability/' + this.today + '/98').valueChanges()
    },{
      id: 99,
      name: "CESA VUT - tělocvična F1", 
      skymUrl: "https://badminton.skym.cz/sportoviste/cesa-vut-sa-ppv---telocvicna-f1/",
      hours: this.db.list('/court-availability/' + this.today + '/99').valueChanges()
    },{
      id: 33,
      name: "Sportcentrum Kuklenská", 
      skymUrl: "https://skym.cz/sportoviste/sportcentrum-kuklenska/",
      hours: this.db.list('/court-availability/' + this.today + '/33').valueChanges()
    },{
      id: 44,
      name: "Badminton Židenice", 
      skymUrl: "https://skym.cz/sportoviste/badminton-zidenice/",
      hours: this.db.list('/court-availability/' + this.today + '/44').valueChanges()
    },{
      id: 54,
      name: "Yonex Jehnice", 
      skymUrl: "https://skym.cz/sportoviste/yonex-jehnice/",
      hours: this.db.list('/court-availability/' + this.today + '/54').valueChanges()
    },{
      id: 39,
      name: "Club Classic", 
      skymUrl: "https://skym.cz/sportoviste/club-classic/badminton/",
      hours: this.db.list('/court-availability/' + this.today + '/39').valueChanges()
    }];
  }

  getReservationUrl(arenaId, date) {
    return "https://badminton.skym.cz/sportoviste/?id=" + arenaId + "&sport=0&date=" + date;
  }

}
