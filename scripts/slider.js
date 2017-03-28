(function ($) {
  var massSlider = $('#tempRange'),
    lifespanSlide = $('#lifespan');

  function setStyle(slider, startPoints = [0]) {
    $(slider).slider();
  }

  $(document).ready(function () {
    var sliders = $('input[type="range"]');
    setSliderStyle(sliders);
    bindSliderEvents(sliders);
  });

  function displayValueOnTooltip(slider, value) {
    var sibling = slider.siblings().first(),
      tooltips = sibling.children('.tooltip'),
      innerTooltips = tooltips.children('.tooltip-inner');

    innerTooltips.html(value);
  }

  function bindSliderEvents(sliders) {
    addSlideEvent(sliders);
    addBootsrapMassSliderEvents();
  }

  function addSlideEvent(sliders) {
    sliders.on("slide", function(e) {
      var slider = $(e.target),
        valueSpanId = '#' + slider.attr('id') + 'Value';

      var value = e.value;
      if (slider.attr('id') == massSlider.attr('id')) {
        var mass = Math.pow(10, e.value);
        value = mass;
        onMassSliderSlide(e.value);
      } else if (slider.attr('id') == lifespanSlider.attr('id')) {
        statsView.html(timeControl.update(e.value));
      }

      $(valueSpanId).html(value);
      displayValueOnTooltip(slider, value);
    });
  }

  function setSliderStyle(sliders) {
    for (var i = 0; i < sliders.length; i++) {
      var slider = sliders[i];
      setStyle(slider);
    }
  }

  function onMassSliderSlide(selectedOption) {
    if(selectedOption == 0)
    {
      showValue(6000);
    }
    else {
      showValue(1000);
    }
  }

  function addBootsrapMassSliderEvents() {
    var massSliderSibling = massSlider.siblings('.slider').first(),
      handle = massSliderSibling.children('.slider-handle').first();

    massSliderSibling.on('mouseover moousedown change click mouseenter toggle', function (e) {
      e.preventDefault();
      var selectedOption = handle.attr('aria-valuenow'),
        slider = $(e.target),
        mass = Math.pow(10, selectedOption);

      displayValueOnTooltip(massSlider, mass);
    });
  }
})(jQuery);
