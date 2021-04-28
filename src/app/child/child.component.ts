import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatFormField,MatInput } from '@angular/material';
import { NgForm, FormGroup, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'child-component',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  userdetails: FormGroup;

  constructor(private formBuilder: FormBuilder,private changeDetectorRef: ChangeDetectorRef) { }

  //country: formControlName = new formControlName();
  //state: FormControl = new FormControl();

  statesFiltered = [];
  display: boolean = false;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  EmailId: string;
  Phone;
  Height;
  Weight;
  DoorNo: string;
  Country: string;
  State: string;
  Zipcode: string;

  address = {
    "Countries":[
       {
          "id":0,
          "CountryName":"India",
          "States":[
             {
                "id":0,
                "StateName":"Andhra Pradesh",
             },
             {
                "id":1,
                "StateName":"TamilNadu",
             },
             {
                "id":3,
                "StateName":"Karnataka",
             },
             {
                "id":4,
                "StateName":"Kerala",
             }
          ]
       },
       {
          "id":1,
          "CountryName":"USA",
          "States":[
             {
                "id":0,
                "StateName":"Califonia",
             },
             {
                "id":1,
                "StateName":"Texas"
             },
             {
               "id":2,
               "StateName":"Alaska"
            }
          ]
       },
       {
         "id":2,
         "CountryName":"Australia",
         "States":[
            {
               "id":0,
               "StateName":"Queensland",
            },
            {
               "id":1,
               "StateName":"NewSouth Wales"
            },
            {
              "id":2,
              "StateName":"Tasmania"
            }
         ]
      },
      {
         "id":3,
         "CountryName":"Canada",
         "States":[
            {
               "id":0,
               "StateName":"Alberta",
            },
            {
               "id":1,
               "StateName":"British Columbia"
            },
            {
              "id":2,
              "StateName":"Manitoba"
            },
            {
               "id":3,
               "StateName":"Nunavut"
             }
         ]
      }
    ]
 };

  onSaved(){
    this.display = true;
    this.FirstName = this.userdetails.get('firstName').value;
    this.LastName = this.userdetails.get('lastName').value;
    this.MiddleName = this.userdetails.get('middleName').value;
    this.DoorNo = this.userdetails.get('doorNo').value;
    this.Country = this.userdetails.get('country').value;
    this.State = this.userdetails.get('stateName').value;
    this.Zipcode = this.userdetails.get('zipcode').value;
    this.Height = this.userdetails.get('height').value;
    this.Weight = this.userdetails.get('weight').value;
    this.EmailId = this.userdetails.get('emailid').value;
    this.Phone = this.userdetails.get('phonenum').value;
   // this.userdetails.reset();
  }

  ngOnInit(){
    this.userdetails = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      middleName: ['',[Validators.required]],
      doorNo:['',Validators.required],
      country: ['',[Validators.required]],
      stateName: ['',[Validators.required]],
      zipcode: ['',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{5}$")]],
      phonenum:['',[Validators.required,Validators.pattern("^\\+[1-9]{1}[0-9]{3,14}$")]],
      emailid:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      height:['',[Validators.required]],
      weight:['',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{0,2}$")]]
    });

    this.userdetails.get('country').valueChanges.subscribe(() => {
      this.statesFiltered = [];
      this.changeDetectorRef.detectChanges();
      this.statesFiltered = this.address.Countries.find(country => {
        return country.CountryName === this.userdetails.get('country').value;
      }).States;
    });
  }

}
