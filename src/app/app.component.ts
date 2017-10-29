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
  arenas: [{
    arenaId: number,
    playgroundId: number,
    name: String,
    skymUrl: String,
    img: String
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
  firstColumnFixed = false;
  el:ElementRef;

  constructor(db: AngularFireDatabase, el:ElementRef) {
    this.db = db;
    this.el = el;
    for (var i = 6; i < 23; i+=0.5) { this.hours.push(Math.floor(i).toString().padStart(2, "0") + ":" + ((i - Math.floor(i)) * 60).toString().padStart(2, "0"));}
    
    this.arenas = [{
      arenaId: 1,
      playgroundId: 1,
      name: "Sprint", 
      skymUrl: "https://skym.cz/sportoviste/sprint/",
      img: "https://skym.cz/assets/uploads/arenas/1/1435734816_profilovka.gif"
    },{
      arenaId: 93,
      playgroundId: 98,
      name: "CESA VUT - Purkyňova", 
      skymUrl: "https://skym.cz/sportoviste/cesa-vut-telocvicna-purkynova/",
      img: "https://skym.cz/assets/uploads/arenas/93/1444919454_purk2.png"
    },{
      arenaId: 94,
      playgroundId: 99,
      name: "CESA VUT - tělocvična F1", 
      skymUrl: "https://skym.cz/sportoviste/cesa-vut-sa-ppv---telocvicna-f1/",
      img: "https://skym.cz/assets/uploads/arenas/94/1454330025_profil2.jpg"
    },{
      arenaId: 35,
      playgroundId: 33,
      name: "Sportcentrum Kuklenská", 
      skymUrl: "https://skym.cz/sportoviste/sportcentrum-kuklenska/",
      img: "https://skym.cz/assets/uploads/arenas/35/1434719741_kuklenska_profil.jpg"
    },{
      arenaId: 41,
      playgroundId: 44,
      name: "Badminton Židenice", 
      skymUrl: "https://skym.cz/sportoviste/badminton-zidenice/",
      img: "https://badminton.skym.cz/assets/uploads/arenas/41/1434902776_profilovka2.jpg"
    },{
      arenaId: 50,
      playgroundId: 54,
      name: "Yonex Jehnice", 
      skymUrl: "https://skym.cz/sportoviste/yonex-jehnice/",
      img: "https://badminton.skym.cz/assets/uploads/arenas/50/1459857242_profil-z-webu.png"
    },{
      arenaId: 38,
      playgroundId: 39,
      name: "Club Classic", 
      skymUrl: "https://skym.cz/sportoviste/club-classic/badminton/",
      img: "https://badminton.skym.cz/assets/uploads/arenas/38/1434733098_classic_profil.jpg"
    },{
      arenaId: 135,
      playgroundId: 143,
      name: "Badminton Líšeň", 
      skymUrl: "https://skym.cz/sportoviste/badminton-lisen/badminton/",
      img: "https://badminton.skym.cz/assets/uploads/arenas/135/1453886128_profil2.jpg"
    },{
      arenaId: 150,
      playgroundId: 158,
      name: "X-arena", 
      skymUrl: "https://skym.cz/sportoviste/x-arena/badminton/",
      img: "https://badminton.skym.cz/assets/uploads/arenas/150/1478036885_xarena.png"
    }];

    this.setReservationData();    
  }
  ngAfterViewInit() {
    setTimeout(this.checkWidth.bind(this), 3000);
  }

  setDate(date) {
    this.today = date;
  }

  setReservationData() {
    this.availabilityObserver = this.db.object('/court-availability/').valueChanges();
  }

  getReservationUrl(arenaId, date) {
    return "https://skym.cz/sportoviste/?id=" + arenaId + "&sport=0&date=" + date;
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
