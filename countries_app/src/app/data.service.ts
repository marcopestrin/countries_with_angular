import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private postsURL = "http://127.0.0.1:80/countries";

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  getCountry(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Length,X-Foo,X-Bar',
        'Content-Type':  'application/json',
      })
    };

    let this2 = this;
    var data2 = this.http.get(this.postsURL, httpOptions).subscribe(data =>
       //console.log(data)
        data.forEach(function(e) {
          e.distance = this2.getDistanceFromLatLonInKm(e.latitude,e.longitude,45.5546677,12.303427);
        })
      ); 


    var data = this.http.get(this.postsURL, httpOptions); 
    return data;
  }
}


