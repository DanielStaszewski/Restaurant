import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from 'src/models/reservation.model';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {


  reservationForm: FormGroup;
  maxDate : string[];
  minDate: string[];
  chosenDate: string;
  loading: false;

  


  constructor(private formBuilder: FormBuilder, private resService: ReservationService) { }

  ngOnInit(): void {
    this.createForm();
    this.maxDate = new Date(new Date().getTime() + (14*24*60*60*1000)).toLocaleDateString().split('.');
    this.minDate = new Date().toLocaleDateString().split('.');
  }

  createForm(): void{
    this.reservationForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'phone': ['', [Validators.required]],
      'date': ['', [Validators.required]],
      'hour': ['', [Validators.required]],
      'people': ['', [Validators.required]]
    });
  }

  onSubmit(){
    this.takeReservation();
    this.resetForm();
  }


  takeReservation(): void{
    const reservation: Reservation = {
      name: this.reservationForm.get('name').value,
      email: this.reservationForm.get('email').value,
      phone: +this.reservationForm.get('phone').value,
      date: this.reservationForm.get('date').value,
      hour: this.reservationForm.get('hour').value,
      people: +this.reservationForm.get('people').value
    }
   // this.resService.addReservation(reservation);
  }

  resetForm(): void{
    this.reservationForm.reset();
  }









}
