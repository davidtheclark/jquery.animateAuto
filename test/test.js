// height

$('#trigger-h-full').click(function() {
  $('#content-h-full').animateAuto();
});

$('#trigger-h-restricted').click(function() {
  $('#content-h-restricted').animateAuto();
});

// width

$('#trigger-w-min').click(function() {
  $('#content-w-min').animateAuto('width');
});

$('#trigger-w-restricted').click(function() {
  $('#content-w-restricted').animateAuto({
    dimension: 'width'
  });
});


// options -------

// open only

$('#trigger-open').click(function() {
  $('#content-open-close').animateAuto('open');
});

$('#trigger-open-option').click(function() {
  $('#content-open-close').animateAuto({
    action: 'open'
  });
});

// close only

$('#trigger-close').click(function() {
  $('#content-open-close').animateAuto('close');
});

$('#trigger-close-option').click(function() {
  $('#content-open-close').animateAuto({
    action: 'close'
  });
});

// closed height

$('#trigger-closed-height').click(function() {
  $('#content-closed-height').animateAuto({
    closed: 30
  });
});

// open class

$('#trigger-open-class').click(function() {
  $('#content-open-class').animateAuto({
    openClass: 'is-active'
  });
});

// speed

$('#trigger-speed').click(function() {
  $('#content-speed').animateAuto(2000);
});

$('#trigger-speed-option').click(function() {
  $('#content-speed').animateAuto({
    speed: 100
  });
});

// easing

$('#trigger-easing').click(function() {
  $('#content-easing').animateAuto('linear');
});

$('#trigger-easing-option').click(function() {
  $('#content-easing').animateAuto({
    easing: 'linear'
  });
});

// callback

$('#trigger-callback').click(function() {
  $('#content-callback').animateAuto(function() {
    alert('opening or closing, dunno which');
  });
});

$('#trigger-callback-open').click(function() {
  $('#content-callback').animateAuto('open', function() {
    alert('opening');
  });
});

$('#trigger-callback-close').click(function() {
  $('#content-callback').animateAuto({
    action: 'close'
  }, function() {
    alert('closing');
  });
});

// weird argument orders

$('#trigger-arg-order-1').click(function() {
  $('#content-arg-order').animateAuto('open', function() {
    alert('open');
  }, {
    openClass: 'is-active'
  }, 1000, 'linear');
});

$('#trigger-arg-order-2').click(function() {
  $('#content-arg-order').animateAuto(2000, 'close', {
    closed: 30
  }, 'swing', function() {
    alert('closed');
  });
});

$('#trigger-arg-order-3').click(function() {
  $('#content-arg-order').animateAuto('toggle', 'linear', 200);
});