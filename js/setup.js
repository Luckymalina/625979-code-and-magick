'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var wizards = [];

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandom = function (array) {
  return Math.floor(Math.random() * array.length);
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

// сценарии взаимодействия пользователя с сайтом

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var inputUserName = setup.querySelector('.setup-user-name');

setup.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onInputFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onInputBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var addHandler = function (button, item, attr, array) {
  var el = setup.querySelector(button);
  el.addEventListener('click', function () {
    var random = getRandom(array);
    el.style[attr] = array[random];
    setup.querySelector('input[name="' + item + '-color"]').value = array[random];
  });
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  inputUserName.addEventListener('focus', onInputFocus);
  inputUserName.addEventListener('blur', onInputBlur);
  addHandler('.wizard-coat', 'coat', 'fill', coats);
  addHandler('.wizard-eyes', 'eyes', 'fill', eyes);
  addHandler('.setup-fireball-wrap', 'fireball', 'background', fireballs);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
