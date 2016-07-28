$(function () {
  console.log("sanity check");
  getProduct();

  function getProduct() {
    $.ajax ({
      url: 'http://galvanize-student-apis.herokuapp.com/gcommerce/products',
      method: 'GET'
    }).done(function (product) {
      console.log(product);
      for (var i = 0; i < product.length; i++) {


        var price = product[i]['price'];
        var id = product[i]['id'];
        var size = product[i]['size']

        var $productRow = $('<div id="prod_det" class="row"><img class="col-md-4 col-sm-12" src="https://placehold.it/350x240" alt="Placeholder"/><div class="col-md-8 col-sm-12"><h1>Product Name</h1><h3 id="price_1">' + price + '</h3><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' + '<h5>Product id: ' + id + '</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><hr></div></div>');

        $('#product').append($productRow);

        console.log(id, i);

        if (id % 2 === 0) {
          $productRow.addClass('scooter')
        } else {
          $productRow.addClass('yoyo')
        }

      }
    })
  }
});

$('#cat_1').on('click', function(e) {
  e.preventDefault();
  $('.row').css("display", "initial");
  $('.scooter').css("display", "none");
  // $('#cat_2').toggleClass( "btn-primary");
  $('#cat_1').toggleClass( "btn-primary");
  $('#cat_2').removeClass( "btn-primary");
  console.log('cat_1');
});

$('#cat_2').on('click', function(e) {
  e.preventDefault();
  $('.row').css("display", "initial");
  $('.yoyo').css("display", "none");
  $('#cat_1').removeClass( "btn-primary");
  $('#cat_2').toggleClass( "btn-primary");
  console.log('cat_2');
});

// $('#cat_3').on('click', function(e) {
//   e.preventDefault();
//   console.log('cat_3');
// });
//
// $('#cat_4').on('click', function(e) {
//   e.preventDefault();
//   console.log('cat_4');
// });
//
// $('#cat_5').on('click', function(e) {
//   e.preventDefault();
//   console.log('cat_5');
// });
