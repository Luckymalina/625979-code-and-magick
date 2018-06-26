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

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var setup = document.querySelector('.setup');

  var indexColor = 0;


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };


  var onWizardClick = function (button, item, attr, array) {
    var el = setup.querySelector(button);
    el.addEventListener('click', function () {
      indexColor = (indexColor + 1) % array.length;
      el.style[attr] = array[indexColor];
      setup.querySelector('input[name="' + item + '-color"]').value = array[indexColor];
    });
  };

  onWizardClick('.wizard-coat', 'coat', 'fill', coats);
  onWizardClick('.wizard-eyes', 'eyes', 'fill', eyes);
  onWizardClick('.setup-fireball-wrap', 'fireball', 'background', fireballs);


  var loadHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(window.utils.getRandomValue(wizards)));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
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
