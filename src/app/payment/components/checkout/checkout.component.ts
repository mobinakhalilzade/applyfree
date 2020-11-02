import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../payment.service';
import dropin from 'braintree-web-drop-in';

declare var braintree: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  loading: boolean = true;
  constructor(
    private service: PaymentService
  ) { }

  payment(nonce: string) {
    this.service.payment({ paymentMethodNonce: nonce }).subscribe((response: any) => {
      if (response.status == 200) {

      }
    });
  }

  ngOnInit(): void {
    const self = this;
    var submitButton = document.querySelector('#submit-button');

    this.service.token().subscribe((data: any) => {
      if (data.status == 200) {
        const token = data.body;
        dropin.create({
          authorization: token,
          container: '#dropin-container'
        }, (err: any, dropinInstance: any) => {
          if (err) {
            // Handle any errors that might've occurred when creating Drop-in
            console.error(err);
            return;
          }

          self.loading = false;

          submitButton.addEventListener('click', function () {
            dropinInstance.requestPaymentMethod((err: any, payload: any) => {
              if (err) {
                // Handle errors in requesting payment method
                console.log(err)
              }

              self.payment(payload.nonce)

              // Send payload.nonce to your server
            });
          });
        });
      }
    });

  }

}
