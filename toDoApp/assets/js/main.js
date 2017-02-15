console.log("main.js");

var toDo = (function() {

	num = 0;

	function createToDoItem(toDoList, toDoValue) {
		var toDoItem = document.createElement("li");
		toDoItem.classList.add("collection-item", "dismissable");
		toDoItem.innerHTML = toDoValue;

		var checkboxInput = document.createElement("input");
		checkboxInput.type = "checkbox";
		checkboxInput.name = "checkbox";
		checkboxInput.id = "checkbox" + num;

		var label = document.createElement("label");
		label.classList.add("secondary-content");
		label.htmlFor = "checkbox" + num;
		
		var dismissBtn = document.createElement("a");
		dismissBtn.classList.add("secondary-content", "delete-btn");
		
		var dismissBtnIcon = document.createElement("i");
		dismissBtnIcon.classList.add("material-icons", "scale-up");
		dismissBtnIcon.innerHTML = "delete_forever";
		
		toDoList.appendChild(toDoItem);
		toDoItem.appendChild(checkboxInput);
		toDoItem.appendChild(label);
		toDoItem.appendChild(dismissBtn);
		dismissBtn.appendChild(dismissBtnIcon);

		checkboxInput.addEventListener("click", function() {
			// console.dir(this.checked);

			var listItem = this.parentElement;

			listItem.classList.toggle("deep-orange");
			listItem.classList.toggle("lighten-3");

			updateCounter();
		});

		dismissBtn.addEventListener("click", function() {
			// console.dir(this.checked);

			var listItem = this.parentElement;

			listItem.remove();

			updateCounter();			
		});

		num++;
		updateCounter();
	}

	var doneAllBtn = document.getElementById("done-all");

	doneAllBtn.addEventListener("click", function() {
		markAllDone();	
	});

	function markAllDone() {

		var checkboxes = document.getElementsByName("checkbox");
	  
		for(var i=0; i<checkboxes.length; i++) {
			checkboxes[i].checked = true;
			checkboxes[i].parentElement.classList.add("deep-orange");
			checkboxes[i].parentElement.classList.add("lighten-3");
		}

		updateCounter();
	}

	var dismissAllBtn = document.getElementById("dismiss-all");

	dismissAllBtn.addEventListener("click", function() {
		dismissAll();	
	});

	function dismissAll() {
		var dismissable = document.querySelectorAll(".dismissable");

		for(var i=0; i < dismissable.length; i++) {
			dismissable[i].remove();
		}	

		updateCounter();	
	}

	var toggleDoneBtn = document.getElementById("toggle-done");

	toggleDoneBtn.addEventListener("click", function() {
		toggleDone();
	});

	function toggleDone() {

		var checkedListItems = document.querySelectorAll(".deep-orange"); 

		var list = document.querySelector(".todo-list");

		list.classList.toggle("done-invisible");
		

		var visibilityBtn = document.getElementById("visibility");

		if (list.classList.contains("done-invisible")) {
			visibilityBtn.innerHTML = "visibility";	
		} else {
			visibilityBtn.innerHTML = "visibility_off";
		}	
	}

	function updateCounter() {
		var listItems = document.querySelectorAll(".collection-item");
		var checkedListItems = document.querySelectorAll(".deep-orange");

		var counterText = document.querySelector("#count");
		var checkedCounterText = document.getElementById("#checked-counter"); 
		// console.log(listItems);
		//returns all li's in an array

		var toDoCount = listItems.length;

		if (toDoCount < 1) {
			counterText.innerHTML = "You have no todos.";
		} else if (toDoCount === 1) {
			counterText.innerHTML = "You have " + toDoCount + " todo.";
		} else {
			counterText.innerHTML = "You have " + toDoCount + " todos.";
		}

		var doneCount = toDoCount - checkedListItems.length

		if (doneCount < 1) {
			checkedCounterText.innerHTML = "all complete";
		} else {
			checkedCounterText.innerHTML = doneCount + "/" + toDoCount;
		}
	}

	function toggleListVisibility(toDoList) {
		var listArea = document.querySelector(".list-area");
		if(toDoList.children.length >= 1) {
			//remove hidden
			listArea.classList.remove("hide");
		} else {
			//add hidden
			listArea.classList.add("hide");
		}
	}			

	function formListenerInit() {

		var form = document.querySelector("form");

		form.addEventListener("submit", function(e) {
			e.preventDefault();
			
			var toDoList = document.querySelector(".todo-list");
			var formInput = document.querySelector("#item-input");
			var inputValue = formInput.value;

			inputValue.trim();
			
			if (inputValue.length > 0) {
				createToDoItem(toDoList, inputValue);
			} else {
				formInput.focus();
			}
			
			toggleListVisibility(toDoList);

			formInput.value = "";
		});
	}

	var init = function() {
		formListenerInit();
	}

	return {
		init: init
	}
})();

window.onload = function() {
	toDo.init();
}












