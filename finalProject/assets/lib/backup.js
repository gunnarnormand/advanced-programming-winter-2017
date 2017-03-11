'use strict';

window.onload = function () {
	console.log('app.init()');
	app.init();
};

var app = function () {
	//    $_ denotes DOM element
	var $searchForm = document.querySelector('#search-form');
	var $placesList = document.querySelector('#places-list');
	var $myModalLabel = document.querySelector('#myModalLabel');
	var $placeType = document.querySelector('#place-type');
	var $reviewForm = document.querySelector('#review-form');
	// try to get from localStorage if not there fall back to empty array
	var places = JSON.parse(localStorage.getItem('items')) || [];

	var reviews = JSON.parse(localStorage.getItem('items')) || [];

	var init = function init() {
		controller();
	};

	var controller = function controller() {

		function addPlace(e) {
			e.preventDefault();
			var $placesInput = this.querySelector('[name=place]');
			var placeText = $placesInput.value;
			placeText.trim();
			var place = {
				placeText: placeText,
				deleted: false,
				reviews: []
			};
			if (placeText.length > 0) {
				places.push(place);
				displayPlace(places, $placesList);
				localStorage.setItem('items', JSON.stringify(places));
				this.reset();
				// } else if (deleted === true) {
				// 	localStorage.removeItem('items', JSON.stringify(places));
			} else {
				$placesInput.focus();
			}
		}

		function addReview(e) {
			e.preventDefault();
			var $reviewInput = this.querySelector('[name=');
		}

		function displayPlace() {
			var places = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var placesList = arguments[1];

			placesList.innerHTML = places.map(function (place, i) {
				return '\n\t\t\t\t\t<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated slideInDown">\n\t\t\t\t\t\t<h2 class="h2-responsive"><strong>' + place.placeText + '</strong></h2>\n\t\t\t\t\t\t<div class="card-block">\n\t\t\t                <div class="text-center">\n\t\t\t                    <button type="button" name="reviewbtn" data-index=' + i + ' data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>\n\t\t\t                    <button type="button" name="deleted" data-index=' + i + ' class="btn btn-sm btn-secondary waves-effect btn-block" >remove</button>\n\t\t\t                </div>\n\t\t\t\t        </div>\n\t\t\t        </div> \n\t\t\t\t';
			}).join('');

			// console.clear();
			console.table(places);
		}

		function setDeleted(e) {
			if (!e.target.matches('[name=deleted]')) return; //skip this unless its a deleteButton

			var el = e.target;
			var index = el.dataset.index;
			places[index].deleted = !places[index].deleted;
			localStorage.setItem('items', JSON.stringify(places));
			displayPlace(places, $placesList);
		}

		function setupReviewTitle(e) {
			if (!e.target.matches('[name=reviewbtn]')) return;

			var el = e.target;
			var index = el.dataset.index;

			$myModalLabel.innerHTML = 'Create a review for ' + places[index].placeText;

			displayPlace(places, $placesList);
		}

		function setupReviewForm(e) {

			var defaultReviewForm = function defaultReviewForm(options) {
				var formInfo = options || {};

				formInfo.getFormInfo = function () {
					return '\n\t\t\t\t\t        <div class="md-form">\n\t\t\t\t\t\t\t    <input name="name" type="text" class="form-control">\n\t\t\t\t\t\t\t    <label>' + formInfo.name + '</label>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="md-form">\n\t\t\t\t\t\t\t    <textarea name="review" type="text" class="md-textarea"></textarea>\n\t\t\t\t\t\t\t    <label>' + formInfo.review + '</label>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<select name="rating"  class="browser-default">\n\t\t\t\t\t\t\t    <option value="" disabled selected>' + formInfo.rating + '</option>\n\t\t\t\t\t\t\t    <option value="1">terrible</option>\n\t\t\t\t\t\t\t    <option value="2">decent</option>\n\t\t\t\t\t\t\t    <option value="3">ok</option>\n\t\t\t\t\t\t\t    <option value="4">good</option>\n\t\t\t\t\t\t\t    <option value="5">excellent</option>\n\t\t\t\t\t\t\t</select>\n\n\t\t\t\t\t\t\t<form class="form-inline">\n\t\t\t\t\t\t\t\t<p>' + formInfo.recommend + '</p>\n\t\t\t\t\t            <div class="btn-group" data-toggle="buttons">\n\t\t\t\t\t              <label class="btn btn-primary">\n\t\t\t\t\t                <input type="radio" name="options" id="option2" autocomplete="off"> yes\n\t\t\t\t\t              </label>\n\t\t\t\t\t              <label class="btn btn-primary">\n\t\t\t\t\t                <input type="radio" name="options" id="option3" autocomplete="off"> no\n\t\t\t\t\t              </label>\n\t\t\t\t\t            </div>\n\t\t\t\t\t        </form>\n\t\t\t\t\t';
				};

				return formInfo;
			};

			var restaurantFormBuild = function restaurantFormBuild(options) {
				var formInfo = defaultReviewForm(options);

				formInfo.getRestaurantFormInfo = function () {
					return formInfo.getFormInfo();
				};

				return formInfo;
			};

			var restaurantForm = restaurantFormBuild({
				name: 'name of restaurant',
				review: 'what you liked/disliked about the restaurant',
				rating: 'how was the food',
				recommend: 'would you recommend?'
			});

			var reviewType = e.target.value;

			console.log(reviewType);

			if (reviewType === 'restaurant') {
				$reviewForm.innerHTML = restaurantForm.getRestaurantFormInfo();
			} else if (reviewType === 'hotel') {
				$reviewForm.innerHTML = 'hotel form';
			} else if (reviewType === 'bar') {
				$reviewForm.innerHTML = 'bar form';
			} else if (reviewType === 'attraction') {
				$reviewForm.innerHTML = 'attraction form';
			}
		}

		displayPlace(places, $placesList);
		$searchForm.addEventListener('submit', addPlace);
		$placesList.addEventListener('click', setDeleted);
		$placesList.addEventListener('click', setupReviewTitle);
		$placeType.addEventListener('change', setupReviewForm);

		$reviewForm.addEventListener('submit', addReview);
	};

	return {
		init: init
	};
}();