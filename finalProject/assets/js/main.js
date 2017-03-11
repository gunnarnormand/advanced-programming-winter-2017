window.onload = function() {
  console.log('app.init()');
  app.init(); 
};

const app = (function() {
	const $searchForm = document.querySelector('#search-form');
	const $placesList = document.querySelector('#places-list');
	const $myModalLabel= document.querySelector('#myModalLabel');
	const $placeType = document.querySelector('#place-type');	
	const $reviewForm = document.querySelector('#review-form');		
	// try to get from localStorage if not there fall back to empty array
	const places = JSON.parse(localStorage.getItem('items')) || [];

	const reviews = JSON.parse(localStorage.getItem('items')) || [];


	const init = function() {	
		controller();
	}

	const controller = function() {

		function addPlace(e) {
			e.preventDefault();
			const $placesInput = this.querySelector('[name=place]');
			const placeText = $placesInput.value;
			placeText.trim();
			const place = {
				placeText,
				deleted: false,
				reviews: []
			}
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

			const formInfo = new FormData($reviewForm);

			const formEntries = {};
			
			for(var inputInfo of formInfo.entries()){
				// console.log(inputInfo);
				formEntries[inputInfo[0]] = inputInfo[1];
			}
			
			// console.log(formEntries);

			reviews.push(formEntries);

			console.log(reviews);

			

			// displayReview(reviews, $reviewsList);
			// localStorage.setItem('items', JSON.stringify(reviews));


			$reviewForm.innerHTML = `
				<select id="place-type" class="browser-default">
				    <option value="" disabled selected>place type</option>
				    <option value="restaurant">restaurant</option>
				    <option value="hotel">hotel</option>
				    <option value="bar">bar</option>
				    <option value="attraction">attraction</option>
				    <option value="uncategorized">uncategorized</option>
				</select>
			`;

		}

		function displayPlace(places = [], placesList) {
			placesList.innerHTML = places.map((place, i) => {
				return `
					<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated slideInDown">
						<h2 class="h2-responsive"><strong>${place.placeText}</strong></h2>
						<div class="card-block">
			                <div class="text-center">
			                    <button type="button" name="reviewbtn" data-index=${i} data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>
			                    <button type="button" name="deleted" data-index=${i} class="btn btn-sm btn-secondary waves-effect btn-block" >remove</button>
			                </div>
				        </div>
			        </div> 
				`;
			}).join('');

			// console.clear();
			// console.table(places);
		}

		function displayReview(reviews = [], reviewsList) {
			console.log(reviewsList);
		}


		function setDeleted(e) {
			if(!e.target.matches('[name=deleted]')) return; //skip this unless its a deleteButton
			
			const el = e.target;
			const index = el.dataset.index;
			places[index].deleted = !places[index].deleted;
			localStorage.setItem('items', JSON.stringify(places));
			displayPlace(places, $placesList);
		}

		function setupReviewTitle(e) {
			if(!e.target.matches('[name=reviewbtn]')) return;

			const el = e.target;
			const index = el.dataset.index;

			$myModalLabel.innerHTML = `Create a review for ${places[index].placeText}`;

			displayPlace(places, $placesList);
		}

		function setupReviewForm(e) {

			const dfReview = {
				name: 'name',
				review: 'review',
				rating: 'rating',
				recommend: 'would you recommend?',
				getFormInfo: function() {
					return `
						<div class="md-form">
						    <input name="name" type="text" class="form-control">
						    <label>${this.name}</label>
						</div>

						<div class="md-form">
						    <textarea name="review" type="text" class="md-textarea"></textarea>
						    <label>${this.review}</label>
						</div>

						<select name="rating"  class="browser-default">
						    <option value="" disabled selected>${this.rating}</option>
						    <option value="1">terrible</option>
						    <option value="2">decent</option>
						    <option value="3">ok</option>
						    <option value="4">good</option>
						    <option value="5">excellent</option>
						</select>

						
						<p>${this.recommend}</p>
			            <div class="btn-group" data-toggle="buttons">
			              <label class="btn btn-primary">
			                <input type="radio" name="options" id="option2" autocomplete="off"> yes
			              </label>
			              <label class="btn btn-primary">
			                <input type="radio" name="options" id="option3" autocomplete="off"> no
			              </label>
			            </div>
						
						<div class="text-right">
						    <button type="submit" name="save" class="btn btn-primary">save</button>
						</div>
					`
				}
			}

			const restaurantReview = Object.create(dfReview);

			restaurantReview.name = 'name of restaurant';
			restaurantReview.review = 'did you like the food/atmosphere?';
			restaurantReview.rating = 'how was the food?';
			restaurantReview.price = 'how was the price?';
			restaurantReview.getRestaurantFormInfo = function() {
				return `
					<select name="price"  class="browser-default">
					    <option value="" disabled selected>${this.price}</option>
					    <option value="1">$</option>
					    <option value="2">$$</option>
					    <option value="3">$$$</option>
					</select>
					${restaurantReview.getFormInfo()}
				`;
			}

			const hotelReview = Object.create(dfReview);

			hotelReview.name = 'name of hotel';
			hotelReview.review = 'did you enjoy the service/accommodations?';
			hotelReview.rating = 'how was your stay?';
			hotelReview.getHotelFormInfo = function() {
				return hotelReview.getFormInfo();
			}

			const barReview = Object.create(dfReview);

			barReview.name = 'name of bar';
			barReview.review = 'did you enjoy the drink selection?';
			barReview.rating = 'how was it?';
			barReview.getBarFormInfo = function() {
				return barReview.getFormInfo();
			}

			const attractionReview = Object.create(dfReview);

			attractionReview.name = 'name of attraction';
			attractionReview.review = 'did you enjoy your experience?';
			attractionReview.rating = 'rate the attraction';
			attractionReview.getAttractionFormInfo = function() {
				return attractionReview.getFormInfo();
			}

			const reviewType = e.target.value;

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
	}


	return {
		init: init
	}
})();




























































