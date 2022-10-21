import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from '../interfaces/offer';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offersSubscription!: Subscription;
  offers: Offer[] = [];

  constructor(
    private router: Router,
    private offersService: OfferService
    ) { }

  ngOnInit(): void {
    this.initOffers();
  }

  initOffers(): void {
    this.offersSubscription = this.offersService.offersSubject.subscribe({
      next: offers => this.offers = offers,
      error: console.error
    });
    this.offersService.getOffer();
  }

  ngOnDestroy(): void {
    this.offersSubscription.unsubscribe();
  }
}
