window.onload = function() {
  console.log('app.init()');
  app.init(); 
};



const app = (function() {
	const $searchForm = document.querySelector('#search-form');
	const $placesList = document.querySelector('#places-list');
		
	// try to get from localStorage if not there fall back to empty array
	const places = JSON.parse(localStorage.getItem('items')) || [];


	const init = function() {	
		
		// const $deletedBtn = document.querySelector('[name=deleted]');

		displayPlace(places, $placesList);
		$searchForm.addEventListener('submit', addPlace);
		$placesList.addEventListener('click', deletePlace);

		
	}

	function addPlace(e) {
		e.preventDefault();
		const $placesInput = this.querySelector('[name=place]');
		const placeText = $placesInput.value;
		placeText.trim();
		const place = {
			placeText,
			deleted: false
		}
		if (placeText.length > 0) {
			places.push(place);
			displayPlace(places, $placesList);
			localStorage.setItem('items', JSON.stringify(places));
			this.reset();
		} else {
			$placesInput.focus();
		}		
	}

	function displayPlace(places = [], placesList) {
		placesList.innerHTML = places.map((place, i) => {
			return `
				<div class="col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 py-2 px-2 animated zoomInDown">
					<h2 class="h2-responsive"><strong>${place.placeText}</strong></h2>
					<div class="card-block">
		                <div class="text-center">
		                    <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>
		                    <button type="button" name="deleted" data-index=${i} class="btn btn-sm btn-secondary waves-effect btn-block" >remove</button>
		                </div>
			        </div>
		        </div> 
			`;
		}).join('');


		console.clear();
		console.table(places);
	}


	function deletePlace(e) {
		if(!e.target.matches('[name=deleted]')) return; //skip this unless its a deleteButton
		
		const el = e.target;
		const index = el.dataset.index;
		places[index].deleted = !places[index].deleted;
		localStorage.setItem('items', JSON.stringify(places));
		displayPlace(places, $placesList);

	}
	







	

	return {
		init: init
	}
})();




























































