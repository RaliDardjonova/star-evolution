var TimeControl = (function ($) {
  var defaultUpdateValues = [
    {
      lifespan: {min: 3000000000, max: 7000000000},
      radius: {value: 1.0, unit: "Solar Radius", abbr: "SR"},
      temperature: 5800
    },
    {
      lifespan: {min: 7000000000, max: 10000000000},
      radius: {value: 1.1, unit: "Solar Radius", abbr: "SR"},
      temperature: 5600
    },
    {
      lifespan: {min: 10000000000, max: 12000000000},
      radius: {value: 0.01, unit: "Solar Radius", abbr: "SR"},
      temperature: 12000
    },
    {
      lifespan: {min: 12000000000, max: 13000000000},
      radius: {value: 0.01, unit: "Solar Radius", abbr: "SR"},
      temperature: 11900
    },
  ];

  var maxYears = 13000000000;
  var minYears = 3000000000;

  function timeControl(slider, updateValues) {
    updateValues = updateValues || defaultUpdateValues;
    slider = slider.length ? slider[0]: slider;
    sliderSteps = (slider.max - slider.min) / parseInt(slider.step);

    this.slider = slider;
    this.updateValues = updateValues;
    this.minLifeSpan = minYears;
    this.yearsStep = (maxYears - minYears) / sliderSteps;

    return this;
  }

  timeControl.prototype.update = function () {
    var sliderValue = parseInt(this.slider.value),
      lifespan = sliderValue * this.yearsStep + this.minLifeSpan;

    var stats;
    for(var i = 0; i < this.updateValues.length; i++) {
      var currentValues = this.updateValues[i],
        currentLifespan = currentValues.lifespan;

      if (lifespan >= currentLifespan.min &&
        lifespan <= currentLifespan.max) {
          stats = currentValues;
      }
    }

    return this.statsToString(lifespan, stats);
  };

  timeControl.prototype.statsToString = function(lifespan, stats) {
    var log = 'Lifespan: ' + lifespan + ' ' + 'years' + '<br>';
    log += 'Radius: ' + stats.radius.value + ' ' + stats.radius.abbr + '<br>';
    log += 'Temperature: ' + stats.temperature + ' ' + 'K';

    return log;
  }

  return timeControl;
})(jQuery);
