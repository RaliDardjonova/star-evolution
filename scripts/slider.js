(function ($) {
  function setStyle(slider, startPoints = [0]) {
    $(slider).slider();
  }

  $(document).ready(function () {
    var sliders = $('input[type="range"]');
    sliders.on("slide", function(e) {
      var slider = e.target,
        valueSpanId = '#' + slider.id + 'Value';

      if (slider.id == 'tempRange') {
        if(e.value == 0)
        {
          showValue(6000);
        }
        else {
          showValue(1000);
        }
      }

    	$(valueSpanId).html(Math.pow(10, e.value));
    });

    for (var i = 0; i < sliders.length; i++) {
      var slider = sliders[i];
      setStyle(slider);
    }
  });
})(jQuery);
