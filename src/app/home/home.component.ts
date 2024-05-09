import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/home.model';
import { Subscription } from 'rxjs';
import { OverlayComponent } from '../overlay/overlay.component';
import { HomeService } from '../services/home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSubs$: Subscription = new Subscription();

  @ViewChild('overlaycontent', { static: true })
  overlayContent: OverlayComponent | undefined;

  constructor(private _homeService: HomeService) {}

  ngOnInit(): void {
    this.productsSubs$ = this._homeService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error retriving products.', error);
      },
    });
  }

  titleClicked(ev: Event, id: string): void {
    const productDetails = this.products.filter((item) => {
      return item.id === id;
    });
    this.overlayContent?.displayOverlay(productDetails[0]);
  }

  ngOnDestroy(): void {
    this.productsSubs$.unsubscribe;
  }
}
