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
    hours: Observable<any[]>
  }]; 
  hours = [];
  defaultDate: Date;
  db: AngularFireDatabase;

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
      hours: this.db.list('/court-availability/' + this.today + '/1').valueChanges()
    },{
      id: 2,
      name: "VUT", 
      hours: this.db.list('/court-availability/' + this.today + '/2').valueChanges()
    }];
  }

}
