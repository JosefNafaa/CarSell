import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/interfaces/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.scss']
})
export class SingleOfferComponent implements OnInit {

  currentOffer!: Offer;


  constructor(
    private offersService: OfferService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const offerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.offersService.getOfferById(<string>offerId)
    .then(offer => this.currentOffer = offer)
    .catch(console.error);
  }

}
