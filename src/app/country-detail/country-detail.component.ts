import { Component, OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppDataService } from '../services/app-data.service';
import { Country } from '../view-models/country';
import { FieldDefinition } from '../../fw/dynamic-forms/field-definition';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  operation: string;
  errorMessage: string;
  country: Country;
  countryDefinition: Array<FieldDefinition> = [
    {
      key: 'id',
      type: 'number',
      isId: true,
      label: 'Id',
      required: true
    },
    {
      key: 'name',
      type: 'string',
      isId: false,
      label: 'Country Name',
      required: true
    },
    {
      key: 'epiIndex',
      type: 'number',
      isId: false,
      label: 'EPI Index',
      required: true
    }
  ]

  constructor(private dataService: AppDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    if(this.operation === 'create'){
      this.country = { id: 0,name: '', epiIndex: null };
    }
    else{
      this.dataService.getCountry(+this.route.snapshot.params['id'])
          .subscribe( (country: Country) => this.country = country );
    }
  }

  updateCountry(country: Country): void {
    this.errorMessage = null;
    this.dataService.updateCountry(country).subscribe(
      c => this.router.navigate(['authenticated/country-maint']),
      err => this.errorMessage = 'Error Updating Country'
    );
  }

  createCountry(country: Country){
    this.errorMessage = null;

    this.dataService.createCountry(country).subscribe(
      c => this.router.navigate(['authenticated/country-maint']),
      err => this.errorMessage = 'Error Creating Country'
    )
  }

}
