import {Injectable} from "@angular/core";
import { Answers } from "@app/models/reciever/reciever-tip-data";

@Injectable({
  providedIn: "root"
})
export class SubmissionResourceService {

  context_id: number;
  receivers: string[];
  identity_provided:boolean = false;
  answers: Answers;
  answer: 0;
  score: 0;
}
