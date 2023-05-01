import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmissionResourceService {

  context_id:any
  receivers: []
  identity_provided: false
  answers: {}
  answer: 0
  score: 0

  init(context_id:any){
    this.context_id = context_id
  }

  constructor() {
  }
}
