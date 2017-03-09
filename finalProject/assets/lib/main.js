'use strict';

window.onload = function () {
	console.log('app.init()');
	app.init();
};

var app = function () {
	var $searchForm = document.querySelector('#search-form');
	var $placesList = document.querySelector('#places-list');

	// try to get from localStorage if not there fall back to empty array
	var places = JSON.parse(localStorage.getItem('items')) || [];

	var init = function init() {

		// const $deletedBtn = document.querySelector('[name=deleted]');

		displayPlace(places, $placesList);
		$searchForm.addEventListener('submit', addPlace);
		$placesList.addEventListener('click', deletePlace);
	};

	function addPlace(e) {
		e.preventDefault();
		var $placesInput = this.querySelector('[name=place]');
		var placeText = $placesInput.value;
		placeText.trim();
		var place = {
			placeText: placeText,
			deleted: false
		};
		if (placeText.length > 0) {
			places.push(place);
			displayPlace(places, $placesList);
			localStorage.setItem('items', JSON.stringify(places));
			this.reset();
		} else {
			$placesInput.focus();
		}
	}

	function displayPlace() {
		var places = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var placesList = arguments[1];

		placesList.innerHTML = places.map(function (place, i) {
			return '\n\t\t\t\t<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated zoomInDown">\n\t\t\t\t\t<h2 class="h2-responsive"><strong>' + place.placeText + '</strong></h2>\n\t\t\t\t\t<div class="card-block">\n\t\t                <div class="text-center">\n\t\t                    <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>\n\t\t                    <button type="button" name="deleted" data-index=' + i + ' class="btn btn-sm btn-secondary waves-effect btn-block" >remove</button>\n\t\t                </div>\n\t\t\t        </div>\n\t\t        </div> \n\t\t\t';
		}).join('');

		console.clear();
		console.table(places);
	}

	function deletePlace(e) {
		if (!e.target.matches('[name=deleted]')) return; //skip this unless its a deleteButton

		var el = e.target;
		var index = el.dataset.index;
		places[index].deleted = !places[index].deleted;
		localStorage.setItem('items', JSON.stringify(places));
		displayPlace(places, $placesList);
	}

	return {
		init: init
	};
}();