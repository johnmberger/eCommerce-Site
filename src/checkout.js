$(document).ready(function() {
  validateInput('#lastNameShipping', 1);
  validateInput('#lastNameBilling', 1);
  validateInput('#address1Shipping', 1);
  validateInput('#address1Billing', 1);
  validateInput('#zipCodeShipping', 4);
  validateInput('#zipCodeBilling', 4);
  $('#copyToBilling').click(function() {
    $('#firstNameBilling').val($('#firstNameShipping').val());
    $('#lastNameBilling').val($('#lastNameShipping').val());
    $('#companyBilling').val($('#companyShipping').val());
    $('#companyBilling').val($('#companyShipping').val());
    $('#address1Billing').val($('#address1Shipping').val());
    $('#address2Billing').val($('#address2Shipping').val());
    $('#zipCodeBilling').val($('#zipCodeShipping').val());
    var state = $('#stateShipping option:selected').val();
    $('#stateBilling option[value=' + state + ']').attr('selected','selected');
  });
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
      var errorMessageCC = 'Uh oh. Your credit card number appears to be invalid. Please enter a valid number and resubmit.';
      alertMessage(errorMessageCC, 'danger');
    }
    // Validate the CVC
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      var errorMessageCVC = 'The CVC number appears to be invalid. Please enter a valid number and resubmit.';
      alertMessage(errorMessageCVC, 'danger');
    }
    // Validate the expiration
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      var errorMessageMY = 'The expiration date appears to be invalid. Please enter a valid month and year and resubmit.';
      alertMessage(errorMessageMY, 'danger');
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
        var successMessage = 'Your purchase has been successfully processed!';
        $('#personalInfo')[0].reset();
        alertMessage(successMessage, 'success');
      }
    }
  });
});
//Validation Functions
//Function to validate fields
function validateInput(id, num) {
  $(id).on('input', function() {
    var inputValue = $(this).val();
    if (inputValue.length <= num) {
      $(this).css({'border-color': 'red', 'box-shadow': '0 0 10px red'});
    } else {
      $(this).css({'border-color': '', 'box-shadow': ''});
    }
  });
}
//Apply error or success message
function alertMessage(msg, bSClass) {
  $('#submitMessage').append('<div class="alert alert-dismissible alert-' + bSClass + '"><strong>' + msg + '</strong></div>').delay(3000).fadeOut(500).removeClass('');
}
