import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {ShoppingCartService} from "../shared/service/shoppingCart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showCartIcon = true;
      }
    });

    this.shoppingCartSubscription = this.shoppingCartService.getShoppingCart().subscribe((data) => {
      this.totalQuantity = data ? data.dishes.length : 0;
    });

    this.loginStatusSubscription = this.authService.loginStatus.subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }


  ngOnDestroy(): void {
    if (this.shoppingCartSubscription) {
      this.shoppingCartSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  @Output()
  cartIconClicked: EventEmitter<void> = new EventEmitter();

  title = 'Swifting Eats';

  totalQuantity = 0;

  showCartIcon = false;
  private shoppingCartSubscription: Subscription | undefined;
  private loginStatusSubscription: Subscription | undefined;

  logout() {
    this.authService.logout().subscribe((res) => {
      if (res.success) {
        console.log(res);
        this.authService.user = null;
        this.changeDetector.detectChanges();
      }
    });
  }

  toggleCart(): void {
    this.cartIconClicked.emit();
  }

}
