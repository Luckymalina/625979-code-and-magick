'use strict';

(function () {

  var firstNames = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var lastNames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

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

  var wizards = [];
  var indexColor = 0;

  var getRandomValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var randomizeWizards = function () {
    for (var i = 0; i < 4; i++) {
      var randomName = getRandomValue(firstNames) + ' ' + getRandomValue(lastNames);
      var newObject = {
        name: randomName,
        coatColor: getRandomValue(coats),
        eyesColor: getRandomValue(eyes)
      };
      wizards.push(newObject);
    }
  };

  randomizeWizards();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);


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
})();
