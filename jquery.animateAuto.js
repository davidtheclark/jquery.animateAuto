;(function($) {

  function animateAuto(element, options, speed, easing, callback) {
    var $el = $(element),
        settings = $.extend($.fn.animateAuto.defaults, options),
        dimension = settings.dimension,
        oppositeDimension = (dimension === 'height') ? 'width' : 'height';

    // Determine which function to run based on the setting `action`.
    switch (settings.action) {
      case ('open'):
        openEl($el);
        break;
      case ('close'):
        closeEl($el);
        break;
      case ('toggle'):
        toggleEl($el);
        break;
      default:
        throw new Error('jquery.animateAuto accepts as actions only "open", "close" and "toggle". You seem to have tried something else.');
    }

    function getTargetDimension($el) {
      // Create a hidden clone of $el, appended to
      // $el's parent and with $el's `oppositeDimension`,
      // to ensure it will have dimensions tailored to
      // $el's context.
      // Return the clone's relevant dimension.
      var $clone = $el.clone()
        .css({
          oppositeDimension: $el.css(oppositeDimension),
          'visibility': 'hidden'
        })
        .appendTo($el.parent());
      var cloneContentDimension = $clone
        .css(dimension, 'auto')
        .css(dimension);
      $clone.remove();
      return cloneContentDimension;
    }

    function openEl($el) {
      // Pass jQuery.animate() $el's target dimension
      // and all the other parameters.
      // As part of the callback, set $el's
      // inline-style dimension to `auto`.
      // And add the `openClass`.
      var animObj = {};
      animObj[dimension] = getTargetDimension($el);
      $el.animate(animObj, speed, easing, function() {
        $el.css(dimension, 'auto');
        callback();
      })
        .addClass(settings.openClass);
    }

    function closeEl($el) {
      // Pass jQuery.animate() $el's `closed`
      // and all the other parameters.
      // And remove the `openClass`.
      var animObj = {};
      animObj[dimension] = settings.closed;
      $el.animate(animObj, speed, easing, callback)
        .removeClass(settings.openClass);
    }

    function toggleEl($el) {
      if ($el.hasClass(settings.openClass))
        closeEl($el);
      else
        openEl($el);
    }
  }

  $.fn.animateAuto = function() {
    // User can pass the 4 possible arguments in any order.
    // `options` are plugins-specific settings.
    // The options `dimensions` and `action` can also
    // be passed as isolated strings.
    // `speed`, `easing`, and `callback` corresponds to
    // (and become) jQuery.animate() arguments.
    var options = {},
        callback = function(){},
        speed, easing;
    var l = arguments.length;
    if (l > 4)
      throw new Error('jquery.animateAuto can only handle 4 arguments.');
    for (var i=0;i<l;i++) {
      var arg = arguments[i],
          argType = typeof arg;
      if (!arg) {
        continue;
      }
      switch (arg) {
        case 'height':
        case 'width':
          $.extend(options, { dimension: arg });
          continue;
        case 'open':
        case 'close':
        case 'target':
          $.extend(options, { action: arg });
          continue;
        case 'fast':
        case 'slow':
          speed = arg;
          continue;
      }
      switch (argType) {
        case 'number':
          speed = arg;
          continue;
        case 'string':
          easing = arg;
          continue;
        case 'function':
          callback = arg;
          continue;
        case 'object':
          $.extend(options, arg);
          continue;
      }
    }

    return this.each(function () {
      animateAuto(this, options, speed, easing, callback);
    });
  };

  // Allow user to modify defaults.
  $.fn.animateAuto.defaults = {
    dimension: 'height', // or 'width'
    action: 'toggle', // or 'open', 'close'
    closed: 0,
    openClass: 'is-opened'
  };

})(jQuery);