window.onload = function() {
  console.log('app.init()');
  app.init(); 
};

const app = (function() {
	//    $_ denotes DOM element
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
			const $reviewInput = this.querySelector('[name=')
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
			console.table(places);
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

			var defaultReviewForm = function(options) {
				var formInfo = options || {};

				formInfo.getFormInfo = function() {
					return `
					        <div class="md-form">
							    <input name="name" type="text" class="form-control">
							    <label>${formInfo.name}</label>
							</div>

							<div class="md-form">
							    <textarea name="review" type="text" class="md-textarea"></textarea>
							    <label>${formInfo.review}</label>
							</div>

							<select name="rating"  class="browser-default">
							    <option value="" disabled selected>${formInfo.rating}</option>
							    <option value="1">terrible</option>
							    <option value="2">decent</option>
							    <option value="3">ok</option>
							    <option value="4">good</option>
							    <option value="5">excellent</option>
							</select>

							<form class="form-inline">
								<p>${formInfo.recommend}</p>
					            <div class="btn-group" data-toggle="buttons">
					              <label class="btn btn-primary">
					                <input type="radio" name="options" id="option2" autocomplete="off"> yes
					              </label>
					              <label class="btn btn-primary">
					                <input type="radio" name="options" id="option3" autocomplete="off"> no
					              </label>
					            </div>
					        </form>
					`
				}

				return formInfo;
			}

			var restaurantFormBuild = function(options) {
				var formInfo = defaultReviewForm(options);

				formInfo.getRestaurantFormInfo = function() {
					return formInfo.getFormInfo();
				}

				return formInfo;
			}

			var restaurantForm = restaurantFormBuild({
				name: 'name of restaurant',
				review: 'what you liked/disliked about the restaurant',
				rating: 'how was the food',
				recommend: 'would you recommend?'
			});















			const reviewType = e.target.value;

			console.log(reviewType);

			if (reviewType === 'restaurant') {
				$reviewForm.innerHTML = restaurantForm.getRestaurantFormInfo();
			} else if (reviewType === 'hotel') {
				$reviewForm.innerHTML = `hotel form`;
			} else if (reviewType === 'bar') {
				$reviewForm.innerHTML = `bar form`;
			} else if (reviewType === 'attraction') {
				$reviewForm.innerHTML = `attraction form`;
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




























































