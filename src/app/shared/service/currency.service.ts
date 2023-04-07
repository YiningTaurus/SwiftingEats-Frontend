import {Injectable} from "@angular/core";
import {rates} from "../pipe/currency-exchange.pipe";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService{
  currencyCode: string = 'USD';

  convertToUSD(amount: number): number {
    const rate = rates.get(this.currencyCode);
    if (rate) {
      return amount / rate;
    }
    console.error('Exchange rate not found for currency:', this.currencyCode);
    return amount;
  }

}
