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

        var name = '';
        var price = product[i]['price'];
        var id = product[i]['id'];
        var size = product[i]['size']
        var descripton = product[i]['description']

        if (id % 2 === 0) {
          name = 'Scooter';
        } else {
          name = 'Yo-Yo';
        }

        var $productRow = $('<div id="prod_det" class="row"><img class="col-md-4 col-sm-12" src="https://placehold.it/350x240" alt="Placeholder"/><div class="col-md-8 col-sm-12"><h1>Product #' + id +'</h1><h3>' + price + '</h3><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' + '<h5>Category: ' + name + '</h5><p>' + descripton
        + '</p><hr></div></div>');

        $('#product').append($productRow);

        if (id % 2 === 0) {
          $productRow.addClass('scooter');
        } else {
          $productRow.addClass('yoyo');
        }


        console.log(id, i);



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
