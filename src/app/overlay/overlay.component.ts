import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Product } from '../models/home.model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  @ViewChild('templatePortalContent')
  templatePortalContent!: TemplateRef<any>;
  productDetails!: Product;
  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  displayOverlay(productDetails: Product) {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef?.detach();
    }

    this.productDetails = productDetails;

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().right().top(),
    });

    const component = new TemplatePortal(
      this.templatePortalContent,
      this.viewContainerRef
    );

    const componentRef = this.overlayRef.attach(component);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef?.detach());
  }

  close(): void {
    this.overlayRef?.detach();
  }
}
