import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberSymbol } from '@angular/common';

interface IVehicle {
  id: number;
  year: string;
  make: string;
  model: string;
  details: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() public make: string;
  @Input() public year: string;

  public url: string = 'https://vehicle-data.azurewebsites.net/api';
  public finalUrl: string = '';
  public offset: number = 0;

  public vehicleList: IVehicle[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  async getVehicles() {
    let filUrl: string;
    if (this.make != '' || this.year != '') {
      if (this.make != '') {
        filUrl = this.url + 'makes?make=' + this.make;
        if (this.year != '') {
          filUrl += filUrl + '&years?year=' + this.year;
        }
      } else if (this.year != '') {
        filUrl = this.url + 'years?year=' + this.year;
      } else {
        filUrl = this.url + 'models';
      }
      this.finalUrl = filUrl + '&offset=' + this.offset + '&offset=10';
      const vehicles = await this.httpClient.get<IVehicle[]>(this.finalUrl).toPromise();
      this.vehicleList = vehicles;
    }
  }
}
