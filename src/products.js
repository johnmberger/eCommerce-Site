$(function () {
  console.log("sanity check");
  getProduct();

  function getProduct() {
    $.ajax ({
      url: 'http://galvanize-student-apis.herokuapp.com/gcommerce/products',
      method: 'GET'
    }).done(function (product) {
      console.log(product[0]['price']);
      $('#price_1').append(product[0]['price']);
      $('#price_2').append(product[4]['price']);
      $('#price_3').append(product[7]['price']);
    })
  }

  // http://galvanize-student-apis.herokuapp.com/gcommerce/products

});
