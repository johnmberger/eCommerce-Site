$(document).ready(function() {
  validateInput('#lastNameShipping', 1);
  validateInput('#lastNameBilling', 1);
  validateInput('#address1Shipping', 1);
  validateInput('#address1Billing', 1);
  validateInput('#zipCodeShipping', 5);
  validateInput('#zipCodeBilling', 5);
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
      console.log(ccNum);
      console.log('The credit card number appears to be invalid.');
      var errorMessage = 'Uh oh. Your credit card number appears to be invalid. Please enter a valid number and resubmit.'
      alertMessage(errorMessage, 'danger');
    }
    // Validate the CVC
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      var errorMessage = 'The CVC number appears to be invalid. Please enter a valid number and resubmit.'
      console.log('The CVC number appears to be invalid.');
      alertMessage(errorMessage, 'danger');
    }
    // Validate the expiration
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      var errorMessage = 'The expiration date appears to be invalid. Please enter a valid month and year and resubmit.';
      console.log('The expiration date appears to be invalid.');
      alertMessage(errorMessage, 'danger');
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
        var successMessage = 'Your purchase has been successfully processed!';
        $("#personalInfo")[0].reset();
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
  $("#submitMessage").append('<div class="alert alert-dismissible alert-' + bSClass + '"><strong>' + msg + '</strong></div>').delay(3000).fadeOut(500).removeClass('');
}
