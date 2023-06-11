import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0)
      this.inserRecord(form);
    else
      this.updateRecord(form);
  }

  inserRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getCardList();
        this.toastr.success('Card successfully submitted', 'Payment Register')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getCardList();
        this.toastr.info('Card updated successfully', 'Payment Register')
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.resetForm();
  }

}
