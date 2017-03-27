(function ($, TimeControl) {
  //To become mass slider probably
  var temperatureSliderId = 'tempRange',
    lifespanSliderId = 'lifespan',
    lifespanSlider = $('#' + lifespanSliderId),
    timeControl = new TimeControl(lifespanSlider),
    statsView = $('#stats');

  function setStyle(slider, startPoints = [0]) {
    $(slider).slider();
  }

  $(document).ready(function () {
    var sliders = $('input[type="range"]');
    sliders.on("slide", function(e) {
      var slider = e.target,
        valueSpanId = '#' + slider.id + 'Value';

      if (slider.id == temperatureSliderId) {
        if(e.value == 0)
        {
          showValue(6000);
        }
        else {
          showValue(1000);
        }

        $(valueSpanId).html(Math.pow(10, e.value));
      } else if (slider.id == lifespanSliderId) {
        statsView.html(timeControl.update(e.value));
        $(valueSpanId).html(slider.value);
      }
    });

    for (var i = 0; i < sliders.length; i++) {
      var slider = sliders[i];
      setStyle(slider);
    }
  });
})(jQuery, TimeControl);
