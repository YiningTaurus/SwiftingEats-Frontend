import {Pipe, PipeTransform} from "@angular/core";

export const rates = new Map([['USD', 1], ['CNY', 6.94], ['JPY', 136]]);

@Pipe({
  name: 'currencyExchange'
})
export class CurrencyExchangePipe implements PipeTransform{
  transform(price: number, currencyCode: string): number {
    return price * (rates.get(currencyCode) || 1);
  }
}
