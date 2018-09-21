import {Component, ElementRef} from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import {LeafletPointsService} from "../../services/leaflet-points.service"
//import 'leaflet-map';


@Component({
  selector: 'leaflet-maps',
  templateUrl: './leafletMaps.html',
  styleUrls: ['./leafletMaps.scss']
})
export class LeafletMaps {
  private alive: boolean;
  
  constructor(private _elementRef:ElementRef,private leafletService: LeafletPointsService ) {
  }
  

  ngAfterViewInit() {
    this.alive = true;
    let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');
    L.Icon.Default.imagePath = './assets/raphaellayer/images/';

    var iconServer = L.icon({
      iconUrl: './assets/raphaellayer/images/icon_server.png',        
      iconSize:     [40, 40], // size of the icon        
      iconAnchor:   [30,15], // point of the icon which will correspond to marker's location      
    });

    var iconRouter = L.icon({
      iconUrl: './assets/raphaellayer/images/icon_router.png',        
      iconSize:     [40, 25], // size of the icon        
      iconAnchor:   [30, 15], // point of the icon which will correspond to marker's location            
    });
    
    var map = L.map(el).setView([1.354150,103.828034], 12.2);    
    L.tileLayer('https://api.mapbox.com/styles/v1/steelwolf180/cjg7nvb2u1ot72ro6fw4sm35f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RlZWx3b2xmMTgwIiwiYSI6ImNqZzFwMmlmejY5MXMzM3Mydzk3Z3J6YTYifQ.trkd1jkP8iYWYIaEuRLQ1g', {
        attribution: '',
        maxZoom: 18
    }).addTo(map);
    
    var jsonPoints,jsonLines,jsonPointsDict;

    Observable.timer(0,10000)
    .takeWhile(() => this.alive) // only fires when component is alive
    .subscribe(() => {
      this.leafletService.getJSON().subscribe(data => {

        map.eachLayer(function (layer) {
          if(layer instanceof R.Pulse || layer instanceof R.BezierAnim
          || layer instanceof L.marker)
            map.removeLayer(layer);
        });
        /*L.marker([1.2840999,103.8513269]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();*/
        jsonPoints = data.points;
        jsonLines = data.lines;
        jsonPointsDict = [];
        map.eachLayer(function (layer) {
          if(layer instanceof R.Pulse)
            map.removeLayer(layer);
        });
        var i;
        for (i = 0; i < jsonPoints.length; i++) { 
          if(jsonPoints[i]["type"] == 1)            
            L.marker([jsonPoints[i]["lat"],jsonPoints[i]["lon"]], {icon: iconServer}).addTo(map);
          else
            L.marker([jsonPoints[i]["lat"],jsonPoints[i]["lon"]], {icon: iconRouter}).addTo(map);
          jsonPointsDict[jsonPoints[i]["id"]] = jsonPoints[i];
        }
      });
    });

    Observable.timer(0,1600)
    .takeWhile(() => this.alive) // only fires when component is alive
    .subscribe(() => {
      var i;        
      if(jsonLines != null){
          
        for (i = 0; i < jsonPoints.length; i++) { 
          var p = new R.Pulse(new L.LatLng(jsonPoints[i]["lat"],jsonPoints[i]["lon"]),           
          2,
          {'stroke': jsonPoints[i]["color"], 'fill': '#30a3ec'}, 
          {'stroke': jsonPoints[i]["color"], 'stroke-width': 30});
          //map.removeLayer(p);
          map.addLayer(p);
        }
        for (i = 0; i < jsonLines.length; i++) {     
            var _point1 = jsonPointsDict[jsonLines[i]["start_id"]];
            var _point2 = jsonPointsDict[jsonLines[i]["end_id"]];
            var _pointLoc1 = new L.LatLng(_point1["lat"], _point1["lon"]);
            var _pointLoc2 = new L.LatLng(_point2["lat"], _point2["lon"]);              
            var b = new R.BezierAnim([_pointLoc1, _pointLoc2], {"stroke":jsonLines[i]["color"]}, function() {
              setTimeout(function() {
                map.removeLayer(b);
              }, 1600);
            });
            map.addLayer(b);          
        }
      }      
    });


    

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.alive = false;
  }
  
}
