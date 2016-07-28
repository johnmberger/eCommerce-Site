$(document).ready(function() {
  $('#personalInfo').on('submit', function(event) {
    event.preventDefault();
    var error = false;
    // Get the values
    var ccNum = $('#creditNum').val().replace(/-/g, ''),
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
        console.log('form submitted successfully!');
      }
    }
    });
  });
  validateTextField('#lastNameShipping');
  validateTextField('#lastNameBilling');
  validateTextField('#address1Shipping');
  validateTextField('#address1Billing');
  validateZipField('#zipCodeShipping');
  validateZipField('#zipCodeBilling');
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

//Validation Functions
//Function to validate text field
function validateTextField(id) {
  $(id).on('input', function() {
    var inputValue = $(this).val();
    if (inputValue.length <= 1) {
      $(this).css({'border-color': 'red', 'box-shadow': '0 0 10px red'});
    } else {
      $(this).css({'border-color': '', 'box-shadow': ''});
    }
  });
}
//Function to validate zip code field
function validateZipField(id) {
  $(id).on('input', function() {
    var zipValue = $(this).val().replace(/-/g, '');
    if (zipValue.length < 5) {
      $(this).css({'border-color': 'red', 'box-shadow': '0 0 10px red'});
    } else {
      $(this).css({'border-color': '', 'box-shadow': ''});
    }
  });
}
