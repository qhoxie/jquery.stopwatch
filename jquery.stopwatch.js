/*
 * live timers plugin for jquery
 * http://qhoxie.com/code/stopwatch
 * http://github.com/qhoxie/jquery.stopwatch
 *
 * usage: $(selector).stopwatch(options)
 * options:
 *  interval: [seconds]
 *  classPrefix: [string]
 */

(function($) {
  $.fn.stopwatch = function(options) {
    options = $.extend({}, $.fn.stopwatch.defaults, options);

    function pluralize(num, name) {
      if (parseInt(num) === 1) return name;
      return name + 's';
    }

    function setNumber(num, name, elem) {
      var numHtml = '<div class="' + options.classPrefix + 'numeric">' + num + '</div>',
        nameHtml = '<div class="' + options.classPrefix + 'label">' + pluralize(num, name) + '</div>';
      elem.html(numHtml + nameHtml);
    }

    var elems = this.map(function() {
      var elem = $(this),
        began = elem.data('began');

      return {
        elements: {
          day: $('.' + options.classPrefix + 'day', elem),
          hour: $('.' + options.classPrefix + 'hour', elem),
          minute: $('.' + options.classPrefix + 'minute', elem),
          second: $('.' + options.classPrefix + 'second', elem)
        },
        began: began ? Date.parse(began) : new Date()
      };
    });

    function updateTimes() {
      return elems.each(function() {
        var now = (new Date() - this.began),
          seconds = now.valueOf() / 1000,
          day = (Math.floor(seconds / 86400)) % 86400,
          hrs = (Math.floor(seconds / 3600)) % 24,
          min = (Math.floor(seconds / 60)) % 60,
          sec = (Math.floor(seconds / 1)) % 60;
        day = (day + "").length < 2 ? "0" + day : day;
        hrs = (hrs + "").length < 2 ? "0" + hrs : hrs;
        min = (min + "").length < 2 ? "0" + min : min;
        sec = (sec + "").length < 2 ? "0" + sec : sec;

        setNumber(day, "day", this.elements.day);
        setNumber(hrs, "hour", this.elements.hour);
        setNumber(min, "min", this.elements.minute);
        setNumber(sec, "sec", this.elements.second);
      });
    }

    updateTimes();
    window.setInterval(updateTimes, options.interval * 1000);

    return this;
  };

  $.fn.stopwatch.defaults = {
    interval: 1,
    classPrefix: 'sw_'
  };
})(jQuery);
