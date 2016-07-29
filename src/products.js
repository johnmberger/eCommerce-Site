$(function () {
  console.log('sanity check');
  getProduct();

  function getProduct() {
    $.ajax ({
      url: 'https://galvanize-student-apis.herokuapp.com/gcommerce/products',
      method: 'GET'
    }).done(function (product) {
      for (var i = 0; i < product.length; i++) {

        var name = '';

        // Price remove $ and convert to string

        var price = product[i].price;
        price = price.replace('$', '');
        price = price.toString();

        var id = product[i].id;
        var size = product[i].size;
        var descripton = product[i].description;

        if (id % 2 === 0) {
          name = 'Scooter';
        } else {
          name = 'Yo-Yo';
        }

        var $productRow = $('<div id="product" class="row" data-price="' + price + '"><img class="col-md-4 col-sm-12" src="https://placehold.it/350x240" alt="product"/><div class="col-md-8 col-sm-12"><h1>Product #' + id + '</h1><h3>' + product[i].price + '</h3><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' + '<h5>Category: ' + name + '</h5><p>' + descripton + '</p><hr></div></div>');

        $('#product').append($productRow);

        if (id % 2 === 0) {
          $productRow.addClass('scooter');
        } else {
          $productRow.addClass('yoyo');
        }
      }
    });
  }
});

//Show YoYo
$('#cat_1').on('click', function(e) {
  e.preventDefault();
  $('.row').css('display', 'initial');
  $('.scooter').css('display', 'none');
  $('#cat_1').toggleClass('btn-primary');
  $('#cat_2').removeClass('btn-primary');
  $('#cat_3').removeClass('btn-primary');
  $('#cat_4').removeClass('btn-primary');
  $('#cat_5').removeClass('btn-primary');
  $('#show_all').removeClass('btn-primary');
  console.log('cat_1');
});

//Show Scooter
$('#cat_2').on('click', function(e) {
  e.preventDefault();
  $('.row').css('display', 'initial');
  $('.yoyo').css('display', 'none');
  $('#cat_2').toggleClass('btn-primary');
  $('#cat_1').removeClass('btn-primary');
  $('#cat_3').removeClass('btn-primary');
  $('#cat_4').removeClass('btn-primary');
  $('#cat_5').removeClass('btn-primary');
  console.log('cat_2');
});

// Show All
$('#show_all').on('click', function(e) {
  e.preventDefault();
  console.log(e);
  $('.row').css('display', 'initial');
  $('#show_all').toggleClass('btn-primary');
  $('#cat_1').removeClass('btn-primary');
  $('#cat_2').removeClass('btn-primary');
  $('#cat_3').removeClass('btn-primary');
  $('#cat_4').removeClass('btn-primary');
  $('#cat_5').removeClass('btn-primary');
  console.log('cat_1');
});

// Show $0 - $25
$('#cat_3').on('click', function(e) {
  e.preventDefault();
  $('#cat_3').toggleClass('btn-primary');
  $('#cat_1').removeClass('btn-primary');
  $('#cat_2').removeClass('btn-primary');
  $('#show_all').removeClass('btn-primary');
  $('#cat_4').removeClass('btn-primary');
  $('#cat_5').removeClass('btn-primary');
  // Reset and show all product
  $('.row').css('display', 'initial');
  $('.row.scooter, .row.yoyo').each(function(eachProduct) {
    var price1 = parseFloat($(this).attr('data-price')).toFixed(2);
    if (price1 >= 25) {
      // Display none all product but $0 - $25
      $(this).css('display', 'none');

    }
  });
});

// Show $25 - $50
$('#cat_4').on('click', function(e) {
  e.preventDefault();
  $('#cat_4').toggleClass('btn-primary');
  $('#cat_1').removeClass('btn-primary');
  $('#cat_2').removeClass('btn-primary');
  $('#cat_3').removeClass('btn-primary');
  $('#show_all').removeClass('btn-primary');
  $('#cat_5').removeClass('btn-primary');
  // Reset and show all product
  $('.row').css('display', 'initial');
  $('.row.scooter, .row.yoyo').each(function(eachProduct) {
    var price1 = parseFloat($(this).attr('data-price')).toFixed(2);
    if (price1 <= 25 || price1 >= 50) {
      // Display none all product but $25 - $50
      $(this).css('display', 'none');

    }
  });
});

// Show $50 - $100
$('#cat_5').on('click', function(event) {
  event.preventDefault();
  $('#cat_5').toggleClass('btn-primary');
  $('#cat_1').removeClass('btn-primary');
  $('#cat_2').removeClass('btn-primary');
  $('#cat_3').removeClass('btn-primary');
  $('#cat_4').removeClass('btn-primary');
  $('#show_all').removeClass('btn-primary');
  // Reset and show all product
  $('.row').css('display', 'initial');
  $('.row.scooter, .row.yoyo').each(function(eachProduct) {
    // var price1 = parseInt($(this).attr('data-price'))
    var price1 = parseFloat($(this).attr('data-price')).toFixed(2);
    if (price1 <= 50) {
      // Display none all product but $50 - $100
      $(this).css('display', 'none');
    }
  });
});
