import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const result = [];

    value.forEach((customer) => {
      if (customer.name.indexOf(arg) > -1 || customer.email.indexOf(arg) > -1) {
        result.push(customer);
      }
    });

    return result;
  }
}
