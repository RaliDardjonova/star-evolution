(function ($, config) {
  var massSlider = $('#tempRange'),
    timeSlider = $('#lifespan');

  function setStyle(slider) {
    $(slider).slider();
  }

  function initTimeSlider() {
    timeSlider
      .attr('data-slider-max', config.framesCount)
      .attr('max', config.framesCount);

    var sliderSibling = timeSlider.siblings('.slider').first(),
      handles = sliderSibling.children('.slider-handle');

    handles.attr('aria-valuemax', config.framesCount);
  }

  $(document).ready(function () {
    initTimeSlider();
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
    var massSliderValues = [0.1, 0.16, 1, 10, 100];
    sliders.on("slide", function(e) {
      var slider = $(e.target),
        valueSpanId = '#' + slider.attr('id') + 'Value';

      var value = e.value;
      if (slider.attr('id') == massSlider.attr('id')) {
        var massSliderIndex = e.value + 1;
        value = massSliderValues[massSliderIndex];
        MASS = value;

        //onMassSliderSlide(e.value);
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
})(jQuery, CONFIG);
