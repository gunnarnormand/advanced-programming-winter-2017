'use strict';

window.onload = function () {
	console.log('app.init()');
	app.init();
};

var app = function () {
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

			var formInfo = new FormData($reviewForm);

			var formEntries = {};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = formInfo.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var inputInfo = _step.value;

					// console.log(inputInfo);
					formEntries[inputInfo[0]] = inputInfo[1];
				}

				// console.log(formEntries);
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			reviews.push(formEntries);

			console.log(reviews);

			// displayReview(reviews, $reviewsList);
			// localStorage.setItem('items', JSON.stringify(reviews));


			$reviewForm.innerHTML = '\n\t\t\t\t<select id="place-type" class="browser-default">\n\t\t\t\t    <option value="" disabled selected>place type</option>\n\t\t\t\t    <option value="restaurant">restaurant</option>\n\t\t\t\t    <option value="hotel">hotel</option>\n\t\t\t\t    <option value="bar">bar</option>\n\t\t\t\t    <option value="attraction">attraction</option>\n\t\t\t\t    <option value="uncategorized">uncategorized</option>\n\t\t\t\t</select>\n\t\t\t';
		}

		function displayPlace() {
			var places = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var placesList = arguments[1];

			placesList.innerHTML = places.map(function (place, i) {
				return '\n\t\t\t\t\t<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated slideInDown">\n\t\t\t\t\t\t<h2 class="h2-responsive"><strong>' + place.placeText + '</strong></h2>\n\t\t\t\t\t\t<div class="card-block">\n\t\t\t                <div class="text-center">\n\t\t\t                    <button type="button" name="reviewbtn" data-index=' + i + ' data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>\n\t\t\t                    <button type="button" name="deleted" data-index=' + i + ' class="btn btn-sm btn-secondary waves-effect btn-block" >remove</button>\n\t\t\t                </div>\n\t\t\t\t        </div>\n\t\t\t        </div> \n\t\t\t\t';
			}).join('');

			// console.clear();
			// console.table(places);
		}

		function displayReview() {
			var reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var reviewsList = arguments[1];

			console.log(reviewsList);
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

			var dfReview = {
				name: 'name',
				review: 'review',
				rating: 'rating',
				recommend: 'would you recommend?',
				getFormInfo: function getFormInfo() {
					return '\n\t\t\t\t\t\t<div class="md-form">\n\t\t\t\t\t\t    <input name="name" type="text" class="form-control">\n\t\t\t\t\t\t    <label>' + this.name + '</label>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="md-form">\n\t\t\t\t\t\t    <textarea name="review" type="text" class="md-textarea"></textarea>\n\t\t\t\t\t\t    <label>' + this.review + '</label>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<select name="rating"  class="browser-default">\n\t\t\t\t\t\t    <option value="" disabled selected>' + this.rating + '</option>\n\t\t\t\t\t\t    <option value="1">terrible</option>\n\t\t\t\t\t\t    <option value="2">decent</option>\n\t\t\t\t\t\t    <option value="3">ok</option>\n\t\t\t\t\t\t    <option value="4">good</option>\n\t\t\t\t\t\t    <option value="5">excellent</option>\n\t\t\t\t\t\t</select>\n\n\t\t\t\t\t\t\n\t\t\t\t\t\t<p>' + this.recommend + '</p>\n\t\t\t            <div class="btn-group" data-toggle="buttons">\n\t\t\t              <label class="btn btn-primary">\n\t\t\t                <input type="radio" name="options" id="option2" autocomplete="off"> yes\n\t\t\t              </label>\n\t\t\t              <label class="btn btn-primary">\n\t\t\t                <input type="radio" name="options" id="option3" autocomplete="off"> no\n\t\t\t              </label>\n\t\t\t            </div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="text-right">\n\t\t\t\t\t\t    <button type="submit" name="save" class="btn btn-primary">save</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t';
				}
			};

			var restaurantReview = Object.create(dfReview);

			restaurantReview.name = 'name of restaurant';
			restaurantReview.review = 'did you like the food/atmosphere?';
			restaurantReview.rating = 'how was the food?';
			restaurantReview.price = 'how was the price?';
			restaurantReview.getRestaurantFormInfo = function () {
				return '\n\t\t\t\t\t<select name="price"  class="browser-default">\n\t\t\t\t\t    <option value="" disabled selected>' + this.price + '</option>\n\t\t\t\t\t    <option value="1">$</option>\n\t\t\t\t\t    <option value="2">$$</option>\n\t\t\t\t\t    <option value="3">$$$</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t' + restaurantReview.getFormInfo() + '\n\t\t\t\t';
			};

			var hotelReview = Object.create(dfReview);

			hotelReview.name = 'name of hotel';
			hotelReview.review = 'did you enjoy the service/accommodations?';
			hotelReview.rating = 'how was your stay?';
			hotelReview.getHotelFormInfo = function () {
				return hotelReview.getFormInfo();
			};

			var barReview = Object.create(dfReview);

			barReview.name = 'name of bar';
			barReview.review = 'did you enjoy the drink selection?';
			barReview.rating = 'how was it?';
			barReview.getBarFormInfo = function () {
				return barReview.getFormInfo();
			};

			var attractionReview = Object.create(dfReview);

			attractionReview.name = 'name of attraction';
			attractionReview.review = 'did you enjoy your experience?';
			attractionReview.rating = 'rate the attraction';
			attractionReview.getAttractionFormInfo = function () {
				return attractionReview.getFormInfo();
			};

			var reviewType = e.target.value;

			// console.log(reviewType);

			if (reviewType === 'restaurant') {
				$reviewForm.innerHTML = restaurantReview.getRestaurantFormInfo();
			} else if (reviewType === 'hotel') {
				$reviewForm.innerHTML = hotelReview.getHotelFormInfo();
			} else if (reviewType === 'bar') {
				$reviewForm.innerHTML = barReview.getBarFormInfo();
			} else if (reviewType === 'attraction') {
				$reviewForm.innerHTML = attractionReview.getAttractionFormInfo();
			} else if (reviewType === 'uncategorized') {
				$reviewForm.innerHTML = dfReview.getFormInfo();
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