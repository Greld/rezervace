import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App juch';  
  playgrounds: Observable<any[]>;

  constructor(db: AngularFireDatabase) { 
  	this.playgrounds = db.list('/playground/20160219').valueChanges();
  }
}
