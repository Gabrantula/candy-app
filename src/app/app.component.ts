import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}

/*
import { Component, OnInit } from '@angular/core';
import { DataService } from './service.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="getData()">Get Data</button>
    <pre>{{ responseData | json }}</pre>
  `,
})
export class AppComponent implements OnInit {
  responseData: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Example of using the data service
    this.getData();
  }

  getData() {
    const collection = 'example'; // Replace with your collection name
    const tokens = ['path', 'to', 'data']; // Replace with actual tokens
    this.dataService.getData(collection, tokens).subscribe((data) => {
      this.responseData = data;
    });
  }
}
*/