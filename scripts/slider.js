(function ($) {
  function setStyle(slider, startPoints = [0]) {
    $(slider).slider();
  }

  $(document).ready(function () {
    var sliders = $('input[type="range"]');
    sliders.on("slide", function(e) {
      var slider = e.target,
        valueSpanId = '#' + slider.id + 'Value';

<<<<<<< HEAD
      if (slider.id == 'tempRange') {
      

        $(valueSpanId).html(Math.pow(10, e.value));
      } else if (slider.id == lifespanSliderId) {
        statsView.html(timeControl.update(e.value));
        $(valueSpanId).html(slider.value);
>>>>>>> ae4d212c5c5cbde35c1db062eca5615ba2c8d5e0
      }
    });

    for (var i = 0; i < sliders.length; i++) {
      var slider = sliders[i];
      setStyle(slider);
    }
  });
})(jQuery);
