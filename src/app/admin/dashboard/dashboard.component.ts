import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm , FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy{

   susbscritpion !: Subscription;
   offerForm!: FormGroup;
   offers : Offer[] = [] ;
   currentOfferPhotoFile !: any;
   currentOfferPhotoUrl !:string;
  constructor(
    private formBuilder: FormBuilder,
    private offerService :OfferService

  ) { }


  ngOnInit(): void {

  this.initOfferForm();
  this.offerService.offersSubject.subscribe({
    next : (offers : Offer[])=>{
    this.offers=offers;
  },
    error: (error)=>{
      console.error(error);
    }

  });


this.offerService.getOffer();


  }

  initOfferForm() : void {

    this.offerForm=this.formBuilder.group({
          id:[null],
          title: ['',[Validators.required,Validators.maxLength(100)]] ,
          photo :[],
          brand: ['',Validators.required] ,
          model: ['',Validators.required] ,
          description: ['', [Validators.required]],
          price :0


    });
  }

  onSubmitOfferForm(): void {
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;
    const offerPhotoUrl =  this.offers.find(el => el.id === offerId)?.photo;
    offer = {...offer, photo: offerPhotoUrl};
    if (!offerId || offerId && offerId === '') { // CREATION
      delete offer.id;
      this.offerService.createOffer(offer, this.currentOfferPhotoFile).catch(console.error);
    } else { // MODIFICATION
      delete offer.id;
      this.offerService.editOffer(offer, offerId, this.currentOfferPhotoFile).catch(console.error);
    }
    this.offerForm.reset();
    this.currentOfferPhotoFile = null;
    this.currentOfferPhotoUrl = '';
  }
  onChangeOfferPhoto($event : any ) : void{
    this.currentOfferPhotoFile=$event.target.files[0];
    const fileReader=  new FileReader();
    fileReader.readAsDataURL(this.currentOfferPhotoFile);
    fileReader.onloadend =(e)=>{
      this.currentOfferPhotoUrl=<string>e.target?.result;
    }
  }

  onEditOffer(offer: Offer): void {
    this.currentOfferPhotoUrl = offer.photo ? offer.photo : '';
    this.offerForm.setValue({
      id: offer.id ? offer.id : '',
      title: offer.title ? offer.title : '',
      photo: '',
      brand: offer.brand ? offer.brand : '',
      model: offer.model ? offer.model : '',
      price: offer.price ? offer.price : 0,
      description: offer.description ? offer.description : ''
    });
  }
  onDeleteOfferForm(offerId?:string) : void{
    if(offerId)
    {
      this.offerService.deleteOffer(offerId).catch(console.error);
    }
    else{
      console.error('An id must be provided to delete');
    }

  }
  ngOnDestroy(): void {
    if(this.susbscritpion && !this.susbscritpion.closed)
    this.susbscritpion.unsubscribe;
  }
}
