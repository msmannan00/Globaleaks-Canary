import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'app/src/shared/constants/constants';
import { HttpService } from 'app/src/shared/services/http.service';

@Component({
  selector: 'src-https-csr-gen',
  templateUrl: './https-csr-gen.component.html',
  styleUrls: ['./https-csr-gen.component.css']
})
export class HttpsCsrGenComponent implements OnInit {
  @Output() dataToParent = new EventEmitter<string>();
  @Input() fileResources: any
  csr_cfg: {
    country: string;
    province: string;
    city: string;
    company: string;
    department: string;
    email: string;
  } = {
      country: "",
      province: "",
      city: "",
      company: "",
      department: "",
      email: ""
    };
  protected readonly Constants = Constants;
  constructor(private httpService: HttpService) { }
  ngOnInit(): void {
  }
  submitCSR() {
    this.fileResources.content = this.csr_cfg;
    this.fileResources.csr.content = this.csr_cfg;
    this.httpService.requestCSRContentResource(this.fileResources.csr.name, this.fileResources.csr).subscribe(() => {
      this.dataToParent.emit(this.fileResources);
    });
  }


}
