import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import dropin from 'braintree-web-drop-in';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  loading: boolean = true;
  queryParams = this.route.snapshot.queryParams;

  constructor(
    private service: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  payment(nonce: string) {
    this.service.payment({ paymentMethodNonce: nonce, contract: this.queryParams.c }).subscribe((response: any) => {
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

          self.loading = false;

          if (err) {
            // Handle any errors that might've occurred when creating Drop-in
            console.error(err);
            return;
          }

          submitButton.addEventListener('click', function () {
            dropinInstance.requestPaymentMethod((err: any, payload: any) => {
              if (err) {
                // Handle errors in requesting payment method
                console.log(err)
              }

              if (payload) {
                self.payment(payload.nonce)
              }

              // Send payload.nonce to your server
            });
          });
        });
      }
    });

  }

}
