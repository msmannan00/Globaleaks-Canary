import {Attrs, Option,TriggeredByOption} from "@app/models/app/shared-public-model";

export interface FieldAttrs {
  [key: string]: {
    name: string;
    type: string;
    value: string | number | boolean;
  };
}

export interface Field {
  id: string;
  questionnaire_id:string;
  instance: string;
  editable: boolean;
  type: string;
  template_id: string;
  template_override_id: string;
  step_id: string;
  fieldgroup_id: string;
  multi_entry: boolean;
  required: boolean;
  preview: boolean;
  attrs: Attrs;
  x: number;
  y: number;
  width: number;
  triggered_by_score: number;
  triggered_by_options: TriggeredByOption[];
  options: Option[];
  children: Field[];
  label: string;
  description: string;
  hint: string;
  placeholder: string;
}

export class fieldtemplatesResolverModel {
  id: string;
  instance: string;
  editable: boolean;
  type: string;
  template_id: string;
  questionnaire_id:string;
  template_override_id: string;
  step_id: string;
  fieldgroup_id: string;
  multi_entry: boolean;
  required: boolean;
  preview: boolean;
  attrs: Attrs;
  x: number;
  y: number;
  width: number;
  triggered_by_score: number;
  triggered_by_options: TriggeredByOption[];
  options: Option[];
  children: Field[];
  label: string;
  description: string;
  hint: string;
  placeholder: string;
}