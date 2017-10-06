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
  today = '20160219'; 
  arenas: [{
    id: number,
    name: String,
    hours: Observable<any[]>
  }]; 
  hours = [];

  constructor(db: AngularFireDatabase) {
    for (var i = 0; i < 24; i++) { this.hours.push(i);}
    this.arenas = [{
      id: 1,
      name: "Sprint", 
      hours: db.list('/playground/' + this.today + '/1').valueChanges()
    },{
      id: 2,
      name: "VUT", 
      hours: db.list('/playground/' + this.today + '/2').valueChanges()
    }];
  }
}
