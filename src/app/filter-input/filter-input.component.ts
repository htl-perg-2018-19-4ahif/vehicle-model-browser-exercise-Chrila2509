import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent implements OnInit {

  public url: string = 'https://vehicle-data.azurewebsites.net/api';

  public makesList: String[];
  public yearsList: String[];

  public make: string = '';
  public year: string = '';

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    const makes = await this.httpClient.get<String[]>(this.url + '/makes').toPromise();
    makes.push('');
    this.makesList = makes;

    const years = await this.httpClient.get<String[]>(this.url + '/years').toPromise();
    years.push('');
    this.yearsList = years;
  }

}
