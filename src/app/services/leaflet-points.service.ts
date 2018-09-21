import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';


@Injectable()

export class LeafletPointsService {

  constructor(private http: HttpClient) {
    //this.getJSON().subscribe(data => {
        //console.log(data);
    //});
  }

  public getJSON(): Observable<any> {
    //return this.http.get("./assets/json/leaflet_points.json");
    return this.http.get("http://107.150.28.231:9100/api/v1/atkline/");
  }

}
