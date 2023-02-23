import {Component, Input} from "@angular/core";
import {IProducts} from "../../models/products";

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html'
})

export class ProductComponent {
  @Input() products: IProducts

  details = false
}
