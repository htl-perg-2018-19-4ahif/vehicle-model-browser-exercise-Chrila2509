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

  public url = 'https://vehicle-data.azurewebsites.net/api/models';
  public filUrl = '';
  public finalUrl = '';
  public offset = 0;

  public vehicleList: IVehicle[] = [];

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
  }

  async getVehicles() {
    this.offset = 0;
    if (this.make !== '' || this.year !== '') {
      if (this.make !== '') {
        this.filUrl = this.url + `?make=${this.make}&`;
        if (this.year !== '') {
          this.filUrl += `&year=${this.year}&`;
        }
      } else if (this.year !== '') {
        this.filUrl = this.url + `?year=${this.year}&`;
      }
    } else {
      this.filUrl = this.url + '?';
    }
    this.finalUrl = this.filUrl + `offset=${this.offset}&fetch=10`;
    const vehicles = await this.httpClient.get<IVehicle[]>(this.finalUrl).toPromise();
    this.vehicleList = vehicles;
  }

  async increaseOffset() {
    this.offset += 10;
    this.finalUrl = this.filUrl + `offset=${this.offset}&fetch=10`;
    const vehicles = await this.httpClient.get<IVehicle[]>(this.finalUrl).toPromise();
    this.vehicleList = vehicles;
  }

  async decreaseOffset() {
    if (this.offset >= 10) {
      this.offset -= 10;
      this.finalUrl = this.filUrl + `offset=${this.offset}&fetch=10`;
      const vehicles = await this.httpClient.get<IVehicle[]>(this.finalUrl).toPromise();
      this.vehicleList = vehicles;
    }
  }

  get hasNoNext() {
    if (this.vehicleList.length !== 10) {
      return true;
    }
    return false;
  }
}
