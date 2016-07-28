$(document).ready(function() {
  $('#payment-form').on('submit', function(event) {
    event.preventDefault();
    $("#progressBar").append('<div class="progress progress-striped active"><div class="progress-bar" style="width: 60%"></div></div>').fadeIn(500, function() {
      $(this).delay(2000).fadeOut(500);
    });
    var error = false;
    // Get the values
    var ccNum = $('#creditNum').val(),
    cvcNum = $('#cvcNum').val(),
    expMonth = $('#expiryMonth').val(),
    expYear = $('#expiryYear').val();
    // Validate the number
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      console.log('The credit card number appears to be invalid.');
    }
    // Validate the CVC
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      console.log('The CVC number appears to be invalid.');
    }
    // Validate the expiration
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      console.log('The expiration date appears to be invalid.');
      $("#submitMessage").append('<div class="alert alert-dismissible alert-danger"><strong>' + 'The expiration date appears to be invalid. Please enter a valid month and year and resubmit.' + '</stron></div>').delay(3000).fadeOut(500).removeClass('');
    }
    // Get the Stripe token
    if (!error) {
      Stripe.card.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    function stripeResponseHandler(status, response) {
      if (response.error) {
        console.log(response.error.message);
      } else { // No errors, submit the form.
        console.log('submit form!');
        $("#submitMessage").append('<div class="alert alert-dismissible alert-success"><strong>' + 'Your purchase is a success!' + '</stron></div>');
        $('#submitMessage').fadeIn(500, function() {
          $(this).delay(2000).fadeOut(500);
        }).removeAttr('#submitMessage');
        $('#personalInfo').each(function(){
          this.reset();
          });
        });
      }
    }
  });
  $('#copyToBilling').click(function() {
    $("#firstNameBilling").val($("#firstNameShipping").val());
    $("#lastNameBilling").val($("#lastNameShipping").val());
    $("#companyBilling").val($("#companyShipping").val());
    $("#companyBilling").val($("#companyShipping").val());
    $("#address1Billing").val($("#address1Shipping").val());
    $("#address2Billing").val($("#address2Shipping").val());
    $("#zipCodeBilling").val($("#zipCodeShipping").val());
    var state = $('#stateShipping option:selected').val();
    $('#stateBilling option[value=' + state + ']').attr('selected','selected');
  });
});
