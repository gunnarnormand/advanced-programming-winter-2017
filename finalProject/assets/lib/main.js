'use strict';

window.onload = function () {
	console.log('app.init()');
	app.init();
};

var app = function () {
	var $searchForm = document.querySelector('#search-form');
	var $searchInput = document.querySelector('#search-input');
	var $mainRow = document.querySelector('#main-row');

	var items = [];

	var init = function init() {
		getPlace();
	};

	var getPlace = function getPlace() {
		$searchForm.addEventListener('submit', function (e) {
			e.preventDefault();

			var searchInput = $searchInput.value;
			searchInput.trim();

			searchInput.length > 0 ? createPlace(searchInput) : $searchInput.focus();

			$searchInput.value = '';
		});
	};

	var createPlace = function createPlace(searchInput) {

		var $newPlace = document.createElement('div');
		$newPlace.classList.add('col-md-8', 'col-lg-7', 'mx-auto', 'float-xs-none', 'white', 'z-depth-1', 'py-2', 'px-2', 'animated', 'zoomInDown');

		var $newPlaceName = document.createElement('h2');
		$newPlaceName.classList.add('h2-responsive');
		$newPlaceName.innerHTML = '<strong>' + searchInput + '</strong>';

		var $newPlaceButton = document.createElement('div');
		$newPlaceButton.classList.add('card-block');
		$newPlaceButton.innerHTML = '\n\t\t\t<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>\n\t\t\t<button type="button" class="btn btn-sm btn-secondary waves-effect btn-block">remove</button>\n\t\t';

		$mainRow.appendChild($newPlace);
		$newPlace.appendChild($newPlaceName);
		$newPlace.appendChild($newPlaceButton);
	};

	return {
		init: init
	};
}();