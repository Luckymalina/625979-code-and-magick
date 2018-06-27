'use strict';

(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');
  var setup = document.querySelector('.setup');


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (array) {
    similarList.innerHTML = '';
    for (var i = 0; i < 4; i++) {
      similarList.appendChild(renderWizard(array[i]));
    }

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
