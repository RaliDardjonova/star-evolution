var TimeControl = (function ($, config) {
  function timeControl(slider) {
    this.slider = slider;
    this.slider
      .attr('data-slider-max', config.framesCount)
      .attr('max', config.framesCount);
  }

  timeControl.prototype.update = function (value) {
    var sliderHorizontal = this.slider.siblings('.slider').first();
    var maxSteps = this.slider.attr('data-slider-max'),
      path = value / maxSteps * 100;

    this.sliderHandles = sliderHorizontal.children('.slider-handle');

    // path holds the correct value, but when assigned the percentage
    // is halved, because why not.
    this.sliderHandles
      .css('left', path * 2);
  }

  return timeControl;
})(jQuery, CONFIG);
