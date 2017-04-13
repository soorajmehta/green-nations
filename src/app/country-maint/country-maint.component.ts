import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AppDataService } from '../services/app-data.service';
import { Country } from '../view-models/country'

@Component({
  selector: 'app-country-maint',
  templateUrl: './country-maint.component.html',
  styleUrls: ['./country-maint.component.css']
})
export class CountryMaintComponent implements OnInit {

  countries : Array<Country>;
  deleteError: string;
  deleteId: number;
  isDeleting= false;

  constructor(private dataService: AppDataService,
              private router: Router) {
          dataService.getCountries().subscribe((data) => this.countries = data);
      }

  ngOnInit() {
  }

  cancelDelete(): void {
    this.isDeleting = false;
    this.deleteId = null;
  }


  showCountryDetail(id: number): void{
    this.router.navigate(['/authenticated/country-detail',id,'details']);
  }

  editCountry(id: number){
    this.router.navigate(['/authenticated/country-detail',id,'edit']);
  }

  createCountry(): void{
    this.router.navigate(['/authenticated/country-detail',0,'create']);
  }

  deleteCountryQuestion(id: number): void{
    this.deleteError = null
    this.deleteId = id;
  }

  deleteCountry(id: number): void{
    this.isDeleting = true;
    this.dataService.deleteCountry(id).subscribe(
      c => this.cancelDelete(),
      err => { this.deleteError = err; this.isDeleting = false; }
    )
  }



}
