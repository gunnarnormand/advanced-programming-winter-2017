window.onload = function() {
  console.log('app.init()');
  app.init(); 
};



const app = (function() {
	const $searchForm = document.querySelector('#search-form');
	const $searchInput = document.querySelector('#search-input');
	const $mainRow = document.querySelector('#main-row');	









	const init = function() {
		getPlace();
	}

	const getPlace = function() {
		$searchForm.addEventListener('submit', (e) => {
			e.preventDefault();
			
			let searchInput = $searchInput.value;
			searchInput.trim();

			searchInput.length > 0 ? createPlace(searchInput) : $searchInput.focus();
			
			$searchInput.value = '';
		});
	}

	
	const createPlace = function(searchInput) {

		let $newPlace = document.createElement('div');
		$newPlace.classList.add('col-md-8', 
								'col-lg-7', 
								'mx-auto', 
								'float-xs-none',
								'white', 
								'z-depth-1',
								'py-2',
								'px-2',
								'animated',
								'zoomInDown'
							);
		
		
		let $newPlaceName = document.createElement('h2');
		$newPlaceName.classList.add('h2-responsive');
		$newPlaceName.innerHTML = `<strong>${searchInput}</strong>`;

		let $newPlaceButton = document.createElement('div');
		$newPlaceButton.classList.add('card-block');
		$newPlaceButton.innerHTML = `
										<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary waves-effect btn-block">add review</button>
									`;

		
		 

		
		

		$mainRow.appendChild($newPlace);
		$newPlace.appendChild($newPlaceName);
		$newPlace.appendChild($newPlaceButton);

	}






	

	return {
		init: init
	}
})();




























































