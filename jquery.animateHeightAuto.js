;(function($) {

  function animateHeightAuto(element, options, speed, easing, callback) {
    var $el = $(element),
        settings = $.extend($.fn.animateHeightAuto.defaults, options);

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
        throw new Error('jquery.animateHeightAuto accepts as actions only "open", "close" and "toggle". You seem to have tried something else.');
    }

    function getTargetHeight($el) {
      // Create a hidden clone of $el, appended to
      // $el's parent and with $el's width, to ensure
      // it will have a height tailored to $el's context.
      // Return the clone's height.
      var $parent = $el.parent();
      var $clone = $el.clone()
        .css({
          'width': $el.width(),
          'visibility': 'hidden'
        })
        .appendTo($parent);
      var cloneContentHeight = $clone
        .height('auto')
        .height();
      $clone.remove();
      return cloneContentHeight;
    }

    function openEl($el) {
      // Pass jQuery.animate() $el's target height
      // and all the other parameters.
      // As part of the callback, set $el's
      // inline-style height to `auto`.
      // And add the `openClass`.
      $el.animate({
        height: getTargetHeight($el)
      }, speed, easing, function() {
        $el.height('auto');
        if (callback) callback();
      })
      .addClass(settings.openClass);
    }

    function closeEl($el) {
      // Pass jQuery.animate() $el's `closedHeight`
      // and all the other parameters.
      // And remove the `openClass`.
      $el.animate({
        height: settings.closedHeight
      }, speed, easing, callback)
      .removeClass(settings.openClass);
    }

    function toggleEl($el) {
      if ($el.hasClass(settings.openClass))
        closeEl($el);
      else
        openEl($el);
    }
  }

  $.fn.animateHeightAuto = function() {
    // User can pass the 4 possible arguments in any order.
    // `options` are plugins-specific settings.
    // `speed`, `easing`, and `callback` corresponds to
    //  (and become) jQuery.animate() arguments.
    var options, speed, easing, callback;
    var l = arguments.length;
    if (l > 4)
      throw new Error('jquery.animateHeightAuto can only handle 4 arguments.');
    for (var i=0;i<l;i++) {
      var arg = arguments[i];
      if (!arg) {
        return true;
      } else if (arg === 'fast' || arg === 'slow') {
        speed = arg;
      } else {
        var type = typeof arg;
        switch (type) {
          case 'number':
            speed = arg;
            break;
          case 'string':
            easing = arg;
            break;
          case 'function':
            callback = arg;
            break;
          case 'object':
            options = arg;
            break;
        }
      }
    }

    return this.each(function () {
      animateHeightAuto(this, options, speed, easing, callback);
    });
  };

  // Allow user to modify defaults.
  $.fn.animateHeightAuto.defaults = {
    action: 'toggle', // or 'open', 'close'
    closedHeight: 0,
    openClass: 'is-opened'
  };

})(jQuery);