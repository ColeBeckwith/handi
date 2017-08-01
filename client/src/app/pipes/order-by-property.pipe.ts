import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'orderByProperty'
})
export class OrderByPropertyPipe implements PipeTransform {

    transform(values: any, properties: any, ascending?: number): any {
        // TODO eventually be able to handle both strings and numbers.
        if (values) {
            values = values.sort((a, b) => {
                for (let i = 0; i < properties.length; i++) {
                    if (a[properties[i]] > b[properties[i]]) {
                        return 1 * ascending;
                    }
                    if (a[properties[i]] < b[properties[i]]) {
                        return -1 * ascending;
                    }
                }
            });
            console.log(values);
            return values;
        }

    }

}
