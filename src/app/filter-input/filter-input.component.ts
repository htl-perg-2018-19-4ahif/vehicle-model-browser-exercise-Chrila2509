import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent implements OnInit {

  public url = 'https://vehicle-data.azurewebsites.net/api';

  // tslint:disable-next-line:ban-types
  public makesList: String[];
  // tslint:disable-next-line:ban-types
  public yearsList: String[];

  public make = '';
  public year = '';

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    // tslint:disable-next-line:ban-types
    const makes = await this.httpClient.get<String[]>(this.url + '/makes').toPromise();
    makes.push('');
    this.makesList = makes;

    // tslint:disable-next-line:ban-types
    const years = await this.httpClient.get<String[]>(this.url + '/years').toPromise();
    years.push('');
    this.yearsList = years;
  }

}
