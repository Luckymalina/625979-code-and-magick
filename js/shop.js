'use strict';

(function () {

  var cells = document.querySelector('.setup-artifacts').querySelectorAll('.setup-artifacts-cell');
  var item = document.querySelector('.setup-artifacts-shop').querySelector('img');

  var preventDefault = function (evt) {
    evt.preventDefault();
  };

  var dragDrop = function (evt) {
    evt.preventDefault();
    evt.target.appendChild(item);
  };

  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.addEventListener('dragover', preventDefault);
    cell.addEventListener('dragenter', preventDefault);
    cell.addEventListener('dragdrop', dragDrop);
  }

})();
