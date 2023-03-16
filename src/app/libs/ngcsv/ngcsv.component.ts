import { Component } from '@angular/core';
import sha256 from "fast-sha256";
import {ngxCsv} from "ngx-csv";

@Component({
  selector: 'app-ngcsv',
  templateUrl: './ngcsv.component.html',
  styleUrls: ['./ngcsv.component.css']
})
export class NgcsvComponent {
  onGenerateCSV(){
    var data = [
      {
        name: "Test 1",
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
    ];

    new ngxCsv(data, 'My Report');
  }
}
