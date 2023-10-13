import {Pipe, PipeTransform} from "@angular/core";
import {OrderPipe} from "ngx-order-pipe";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  constructor(private orderPipe: OrderPipe) {
  }

  transform(value: any, expression: any, reverse: any = false): any[] {
    return this.orderPipe.transform(value, expression, reverse);
  }

}
