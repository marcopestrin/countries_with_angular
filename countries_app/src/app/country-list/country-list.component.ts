import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as jQuery from 'jquery';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})

export class CountryListComponent implements OnInit {

  notesForm:FormGroup;
  country$: Object;

  constructor(private data: DataService, private fb: FormBuilder) {
    jQuery(document).ready(function(){
      var cookies = document.cookie.split(' ');
      cookies.forEach(function(i){
        var element = i.split("=");
        var inputToWrite = document.getElementById(element[0]);
        if(inputToWrite != null) {
          //inputToWrite.setAttribute("ng-value",element[1])
          console.log("set");
          jQuery("#"+element[0]).val(element[1]); //questa riga di codice viene messa perchè la precedente creava dei problemi sulla visualizzazione a frontend del contenuto
        }
      })
    })

  }

  onSubmit(id) { 
    event.preventDefault();
    document.cookie = id +"="+ this.notesForm.value.note;
  }
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

  ngOnInit() {

    let this2 = this;
    //this.createForm();

    this.data.getCountry().subscribe(
      /*
      data => this.country$  = data.forEach(function(e) {
        e.distance = this2.getDistanceFromLatLonInKm(e.latitude,e.longitude,45.5546677,12.303427);
        return e;
      }),
      */
      
      data => this.country$ = data

    );
    this.notesForm =  new FormGroup({
      note: new FormControl('')
    })
  }

  ngAfterViewChecked(){ 
   }

  /*
  createForm() {
    this.notesForm = this.fb.group({
      note: ''
    });
  }
  */

}
