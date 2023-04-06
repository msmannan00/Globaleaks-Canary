import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldUtilitiesService {

  parseQuestionnaire(questionnaire:any, parsedFields:any){
    let self = this;

    questionnaire.questionnaires_by_id.forEach(function(step:any){
      parsedFields = self.parseFields(step.children, parsedFields);
    });

    return parsedFields;
  }

  parseFields(fields:any, parsedFields:any){
    let self = this;

    parsedFields.forEach(function(field:any){
      parsedFields = self.parseField(field, parsedFields);
    });

    return parsedFields;
  }

  parseField(field:any, parsedFields:any){
    let self = this;

    if (!Object.keys(parsedFields).length) {
      parsedFields.fields = [];
      parsedFields.fields_by_id = {};
      parsedFields.options_by_id = {};
    }

    if (["checkbox", "selectbox", "multichoice"].indexOf(field.type) > -1) {
      parsedFields.fields_by_id[field.id] = field;
      parsedFields.fields.push(field);
      field.options.forEach(function(option:any) {
        parsedFields.options_by_id[option.id] = option;
      });

    } else if (field.type === "fieldgroup") {
      field.children.forEach(function(field:any) {
        self.parseField(field, parsedFields);
      });
    }

    return parsedFields;
  }


constructor() { }
}
