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

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var wizardCoatElement = setup.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function () {
    onWizardClick('coat', 'fill', coats, wizardCoatElement);
    coatColor = coats[indexColor];
    window.debounce(updateWizards);
  });

  var wizardEyesElement = setup.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function () {
    onWizardClick('eyes', 'fill', eyes, wizardEyesElement);
    eyesColor = eyes[indexColor];
    window.debounce(updateWizards);
  });

  var wizardFireballElement = setup.querySelector('.setup-fireball-wrap');
  wizardFireballElement.addEventListener('click', function () {
    onWizardClick('fireball', 'background', fireballs, wizardFireballElement);
    window.debounce(updateWizards);
  });

  var onWizardClick = function (item, attr, array, button) {
    indexColor = (indexColor + 1) % array.length;
    button.style[attr] = array[indexColor];
    setup.querySelector('input[name="' + item + '-color"]').value = array[indexColor];
  };

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
