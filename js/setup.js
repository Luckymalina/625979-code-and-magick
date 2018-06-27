'use strict';

(function () {

  var coats = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eyes = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var fireballs = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizards = [];
  var setup = document.querySelector('.setup');
  var indexColor = 0;
  var coatColor;
  var eyesColor;
  var fireballColor;

  var updateWizards = function () {

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });
    var sameFireballWizards = wizards.filter(function (it) {
      return it.colorFireball === fireballColor;
    });

    var filteredWizards = sameCoatWizards.concat(sameEyesWizards).concat(sameFireballWizards).concat(wizards);

    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    window.render(uniqueWizards);
  };

  setup.querySelector('.wizard-coat').addEventListener('click', function () {
    onWizardClick('coat', 'fill', coats, '.wizard-coat');
    coatColor = coats[indexColor];
    updateWizards();
  });

  setup.querySelector('.wizard-eyes').addEventListener('click', function () {
    onWizardClick('eyes', 'fill', eyes, '.wizard-eyes');
    eyesColor = eyes[indexColor];
    updateWizards();
  });

  setup.querySelector('.setup-fireball-wrap').addEventListener('click', function () {
    onWizardClick('fireball', 'background', fireballs, '.setup-fireball-wrap');
    fireballColor = fireballs[indexColor];
    updateWizards();
  });

  var onWizardClick = function (item, attr, array, button) {
    var el = setup.querySelector(button);
    indexColor = (indexColor + 1) % array.length;
    el.style[attr] = array[indexColor];
    setup.querySelector('input[name="' + item + '-color"]').value = array[indexColor];
  };

//  var onWizardClick = function (button, item, attr, array) {
//    var el = setup.querySelector(button);
//    el.addEventListener('click', function () {
//      indexColor = (indexColor + 1) % array.length;
//      el.style[attr] = array[indexColor];
//      setup.querySelector('input[name="' + item + '-color"]').value = array[indexColor];
//      updateWizards();
//    });
//  };
//
//  onWizardClick('.wizard-coat', 'coat', 'fill', coats);
//  onWizardClick('.wizard-eyes', 'eyes', 'fill', eyes);
//  onWizardClick('.setup-fireball-wrap', 'fireball', 'background', fireballs);


  var loadHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadHandler, errorHandler);
})();
