/* eslint-disable */
/*
  Solid State by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  'use strict';

  skel.breakpoints({
    xlarge:	'(max-width: 1680px)',
    large:	'(max-width: 1280px)',
    medium:	'(max-width: 980px)',
    small:	'(max-width: 736px)',
    xsmall:	'(max-width: 480px)'
  });

  skel.layout({
    conditionals: true
  });

  $(function () {
    var	$window = $(window),
      $body = $('body'),
      $header = $('#header'),
      $banner = $('#banner');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function () {
      window.setTimeout(function () {
        $body.removeClass('is-loading');
      }, 100);
    });

    // Fix: Placeholder polyfill.
    $('form').placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function () {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active
      );
    });

    // Header.
    if (skel.vars.IEVersion < 9) { $header.removeClass('alt'); }

    if ($banner.length > 0	&&
      $header.hasClass('alt')) {
      $window.on('resize', function () { $window.trigger('scroll'); });

      $banner.scrollex({
        bottom:	$header.outerHeight(),
        terminate:	function () { $header.removeClass('alt'); },
        enter:	function () { $header.addClass('alt'); },
        leave:	function () { $header.removeClass('alt'); }
      });
    }

    // Menu.
    var $menu = $('#menu');

    $menu._locked = false;

    $menu._lock = function () {
      if ($menu._locked) { return false; }

      $menu._locked = true;

      window.setTimeout(function () {
        $menu._locked = false;
      }, 350);

      return true;
    };

    $menu._show = function () {
      if ($menu._lock()) { $body.addClass('is-menu-visible'); }
    };

    $menu._hide = function () {
      if ($menu._lock()) { $body.removeClass('is-menu-visible'); }
    };

    $menu._toggle = function () {
      if ($menu._lock()) { $body.toggleClass('is-menu-visible'); }
    };

    $menu
      .appendTo($body)
      .on('click', function (event) {
        event.stopPropagation();

        // Hide.
        $menu._hide();
      })
      .find('.inner')
      .on('click', '.close', function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        // Hide.
        $menu._hide();
      })
      .on('click', function (event) {
        event.stopPropagation();
      })
      .on('click', 'a', function (event) {
        var href = $(this).attr('href');

        event.preventDefault();
        event.stopPropagation();

        // Hide.
        $menu._hide();

        // Redirect.
        window.setTimeout(function () {
          window.location.href = href;
        }, 350);
      });

    $body
      .on('click', 'a[href="#menu"]', function (event) {
        event.stopPropagation();
        event.preventDefault();

        // Toggle.
        $menu._toggle();
      })
      .on('keydown', function (event) {
        // Hide on escape.
        if (event.keyCode == 27) { $menu._hide(); }
      });

    // Smooth Scroll
    $('a.smooth[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 40
          }, 400);
          return false;
        }
      }
    });
  });

  // Parts of countdown.
  var $days = $('#days'),
    $hours = $('#hours'),
    $minutes = $('#minutes'),
    $seconds = $('#seconds');

  function updateCountdown () {
    var t = getTimeRemaining('27 Oct 2018 12:00:00 GMT')
    $days.text(('0' + t.days).slice(-2));
    $hours.text(('0' + t.hours).slice(-2));
    $minutes.text(('0' + t.minutes).slice(-2));
    $seconds.text(('0' + t.seconds).slice(-2));

    if (t.total <= 0) {
      clearInterval(countdownInterval);
    }
  };

  // Start countdown and update every second.
  updateCountdown();
  var countdownInterval = setInterval(updateCountdown, 1000);

  function getTimeRemaining (endtime) {
    // Time from now until hacking starts.
    var t = Date.parse(endtime) - Date.parse(new Date());
    return {
      total: t,
      days: Math.floor(t / (1000 * 60 * 60 * 24)),
      hours: Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((t / 1000 / 60) % 60),
      seconds: Math.floor((t / 1000) % 60)
    };
  }

  var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
  if (mobile) {
    $('video.fullscreen').css('display', 'none'); // OR you can use $('.navWrap').hide();
  }
})(jQuery);
