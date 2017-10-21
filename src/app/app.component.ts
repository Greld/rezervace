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
    arenaId: number,
    playgroundId: number,
    name: String,
    skymUrl: String
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
  availabilityObserver: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.db = db;
    for (var i = 6; i < 23; i+=0.5) { this.hours.push(Math.floor(i).toString().padStart(2, "0") + ":" + ((i - Math.floor(i)) * 60).toString().padStart(2, "0"));}
    
    this.arenas = [{
      arenaId: 1,
      playgroundId: 1,
      name: "Sprint", 
      skymUrl: "https://skym.cz/sportoviste/sprint/"
    },{
      arenaId: 93,
      playgroundId: 98,
      name: "CESA VUT tělocvična Purkyňova", 
      skymUrl: "https://skym.cz/sportoviste/cesa-vut-telocvicna-purkynova/"
    },{
      arenaId: 94,
      playgroundId: 99,
      name: "CESA VUT - tělocvična F1", 
      skymUrl: "https://skym.cz/sportoviste/cesa-vut-sa-ppv---telocvicna-f1/"
    },{
      arenaId: 35,
      playgroundId: 33,
      name: "Sportcentrum Kuklenská", 
      skymUrl: "https://skym.cz/sportoviste/sportcentrum-kuklenska/"
    },{
      arenaId: 41,
      playgroundId: 44,
      name: "Badminton Židenice", 
      skymUrl: "https://skym.cz/sportoviste/badminton-zidenice/"
    },{
      arenaId: 50,
      playgroundId: 54,
      name: "Yonex Jehnice", 
      skymUrl: "https://skym.cz/sportoviste/yonex-jehnice/"
    },{
      arenaId: 38,
      playgroundId: 39,
      name: "Club Classic", 
      skymUrl: "https://skym.cz/sportoviste/club-classic/badminton/"
    },{
      arenaId: 135,
      playgroundId: 143,
      name: "Badminton Líšeň", 
      skymUrl: "https://skym.cz/sportoviste/badminton-lisen/badminton/"
    }];

    this.setReservationData();    
  }

  setDate(date) {
    this.today = date;
    this.setReservationData();
  }

  setReservationData() {
    this.availabilityObserver = this.db.object('/court-availability/' + this.today).valueChanges();
  }

  getReservationUrl(arenaId, date) {
    return "https://skym.cz/sportoviste/?id=" + arenaId + "&sport=0&date=" + date;
  }

}
