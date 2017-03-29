'use strict';

window.onload = function () {
	console.log('app.init()');
	app.init();
};

var app = function () {
	var $searchForm = document.querySelector('#search-form');
	var $placesList = document.querySelector('#places-list');
	var $myModalLabel = document.querySelector('#myModalLabel');
	var $placeType = document.querySelector('.place-type');
	var $placeTypeForm = document.querySelector('#placeTypeForm');
	var $reviewForm = document.querySelector('#review-form');
	var $reviewsList = document.querySelector('#reviews-list');
	var $showReviews = document.querySelectorAll('.show-reviews');
	var $reviewModalPlace = document.querySelector('#myModalLabel2');
	// try to get from localStorage if not there fall back to empty array
	var places = JSON.parse(localStorage.getItem('places')) || [];

	// const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

	var reviewPlaceIndex = -1; // while creating a new review, this tells us what place it should be attached to


	var init = function init() {
		controller();
	};

	var controller = function controller() {

		function savePlacesToLocalStorage() {
			localStorage.setItem('places', JSON.stringify(places));
		}

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
				refreshPlaces(places, $placesList);
				savePlacesToLocalStorage();
				this.reset();
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

				// console.log(formInfo);
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

			places[reviewPlaceIndex].reviews.push(formEntries);
			savePlacesToLocalStorage();

			// $reviewForm.innerHTML = `
			// 	<select class="place-type browser-default" onchange="this.form.submit();">
			// 		<option value="" disabled selected>place type</option>
			// 		<option value="restaurant">restaurant</option>
			// 		<option value="hotel">hotel</option>
			// 		<option value="bar">bar</option>
			// 		<option value="attraction">attraction</option>
			// 		<option value="uncategorized">uncategorized</option>
			// 	</select>
			// 	<i class="bar"></i>
			// `;

			$reviewForm.reset();

			$placeType.selectedIndex = -1;
			$('#myModal').modal('hide');

			// console.log('review form reset');


			refreshPlaces(places, $placesList);
			refreshReviews(places[reviewPlaceIndex].reviews, $reviewsList);
		}

		function refreshPlaces() {
			var places = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var placesList = arguments[1];


			placesList.innerHTML = places.map(function (place, i) {
				if (place.deleted) return; //`<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated slideInDown">${place.placeText} deleted <a href="#">undo</a></div>`;
				return '\n\t\t\t\t\t<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated slideInDown">\n\t\t\t\t\t\t<h2 class="h2-responsive"><strong>' + place.placeText + '</strong></h2>\n\t\t\t\t\t\t<h3><a data-index="' + i + '" class="show-reviews" name="showreviewbtn" data-toggle="modal" data-target=".modal2" >(' + place.reviews.length + ' reviews)</a></h3>\t\t\t\n\t\t\t\t\t\t<div class="card-block">\n\t\t\t                <div class="text-center">\n\t\t\t                    <button type="button" name="addreviewbtn" data-index=' + i + ' data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>\n\t\t\t                    <button type="button" name="deleted" data-index=' + i + ' class="btn btn-sm btn-secondary waves-effect btn-block" >remove</button>\n\t\t\t                </div>\n\t\t\t\t        </div>\n\t\t\t        </div> \n\t\t\t\t';
			}).join('');

			// console.clear();
			// console.table(places);
		}

		function refreshReviews(reviews, reviewsList) {
			// console.log(reviewsList);

			reviewsList.innerHTML = reviews.map(function (review, i) {
				return '\t\n\t\t\t\t\t<div class="card card-block">\n\t\t\t\t\t    <h2 class="card-title">' + review.name + '</h2>\n\t\t\t\t\t    <p class="card-text">' + review.review + '</p>\n\t\t\t\t\t    <div class="flex-row">\n\t\t\t\t\t        <a class="card-link">Liked: ' + review.recommend + '</a>\n\t\t\t\t\t        <a class="card-link">Rating: ' + review.rating + '/5</a>\n\t\t\t\t\t        <a class="card-link">Price: ' + review.price + '</a>\n\t\t\t\t\t    </div>\n\t\t\t\t\t</div>\n\t\t\t\t';
			}).join('');

			console.table(reviews);
		}

		function setDeleted(e) {
			if (!e.target.matches('[name=deleted]')) return; //skip this unless its a deleteButton

			var el = e.target;
			var index = el.dataset.index;
			places[index].deleted = !places[index].deleted;
			savePlacesToLocalStorage();
			refreshPlaces(places, $placesList);
		}

		function setupReviewTitle(e) {
			if (!e.target.matches('[name=addreviewbtn]')) return;

			var el = e.target;
			var index = el.dataset.index;

			$myModalLabel.innerHTML = 'Create a review for ' + places[index].placeText;

			refreshPlaces(places, $placesList);
		}

		function storeReviewPlaceIndex(e) {
			if (!e.target.matches('[name=addreviewbtn]')) return;

			var el = e.target;
			var index = el.dataset.index;

			reviewPlaceIndex = index;
		}

		function showReviews(e) {
			if (!e.target.matches('[name=showreviewbtn]')) return;

			var el = e.target;
			var index = el.dataset.index;

			// console.table(places[index].reviews);


			$reviewModalPlace.innerHTML = 'Reviews for ' + places[index].placeText;

			refreshReviews(places[index].reviews, $reviewsList);
		}

		function setupReviewForm(e) {
			e.preventDefault();

			var $controlLabel = document.querySelector('.control-label');
			$controlLabel.innerHTML = 'Make your review for the ' + $placeType.value + ' ';

			var dfReview = {
				name: 'name',
				review: 'review',
				rating: 'rating',
				recommend: 'would you recommend?',
				getFormInfo: function getFormInfo() {
					return '\n\t\t\t\t\t\t<div class="md-form">\n\t\t\t\t\t\t    <input name="name" type="text" class="form-control">\n\t\t\t\t\t\t    <label>' + this.name + '</label>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="md-form">\n\t\t\t\t\t\t    <textarea name="review" type="text" class="md-textarea"></textarea>\n\t\t\t\t\t\t    <label>' + this.review + '</label>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<select name="rating"  class="browser-default">\n\t\t\t\t\t\t    <option value="" disabled selected>' + this.rating + '</option>\n\t\t\t\t\t\t    <option value="1">terrible</option>\n\t\t\t\t\t\t    <option value="2">decent</option>\n\t\t\t\t\t\t    <option value="3">ok</option>\n\t\t\t\t\t\t    <option value="4">good</option>\n\t\t\t\t\t\t    <option value="5">excellent</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<i class="bar"></i>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<p>' + this.recommend + '</p>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="btn-group" data-toggle="buttons">\n\t\t\t\t\t\t  <label class="btn btn-primary">\n\t\t\t\t\t\t    <input type="radio" name="recommend" id="option2" autocomplete="off" value="Yes"><i class="fa fa-thumbs-up right"></i>\n\t\t\t\t\t\t  </label>\n\t\t\t\t\t\t  <label class="btn btn-primary">\n\t\t\t\t\t\t    <input type="radio" name="recommend" id="option3" autocomplete="off" value="No"><i class="fa fa-thumbs-down right"></i>\n\t\t\t\t\t\t  </label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="text-right">\n\t\t\t\t\t\t    <button type="submit" name="save" class="btn btn-primary">save</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t';
				}
			};

			var restaurantReview = Object.create(dfReview);

			restaurantReview.name = 'Name of restaurant';
			restaurantReview.review = 'Review of restaurant';
			restaurantReview.rating = 'Restaurant rating';
			restaurantReview.price = 'price';
			restaurantReview.getRestaurantFormInfo = function () {
				return '\n\t\t\t\t\t<select name="price"  class="browser-default">\n\t\t\t\t\t    <option value="" disabled selected>' + this.price + '</option>\n\t\t\t\t\t    <option value="1">$</option>\n\t\t\t\t\t    <option value="2">$$</option>\n\t\t\t\t\t    <option value="3">$$$</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<i class="bar"></i>\n\t\t\t\t\t' + restaurantReview.getFormInfo() + '\n\t\t\t\t';
			};

			var hotelReview = Object.create(dfReview);

			hotelReview.name = 'Name of hotel';
			hotelReview.review = 'Review of hotel';
			hotelReview.rating = 'Hotel rating';
			hotelReview.getHotelFormInfo = function () {
				return hotelReview.getFormInfo();
			};

			var barReview = Object.create(dfReview);

			barReview.name = 'Name of bar';
			barReview.review = 'Review of bar';
			barReview.rating = 'Bar rating';
			barReview.getBarFormInfo = function () {
				return barReview.getFormInfo();
			};

			var attractionReview = Object.create(dfReview);

			attractionReview.name = 'Name of attraction';
			attractionReview.review = 'Review of attraction';
			attractionReview.rating = 'Attraction rating';
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

		refreshPlaces(places, $placesList);
		$searchForm.addEventListener('submit', addPlace);
		$placesList.addEventListener('click', setDeleted);
		$placesList.addEventListener('click', setupReviewTitle);
		$placesList.addEventListener('click', storeReviewPlaceIndex);

		$placeType.addEventListener('change', setupReviewForm);
		// $placeType.forEach(input => input.addEventListener('change', setupReviewForm));

		$reviewForm.addEventListener('submit', addReview);

		$placesList.addEventListener('click', showReviews);
	};

	return {
		init: init,
		places: places
	};
}();