function createToDoItem(toDoList, toDoValue) {
	var toDoItem = document.createElement("li");
	toDoItem.innerHTML = toDoValue;	
	toDoItem.classList.add("todo-item");
	toDoList.appendChild(toDoItem);
	toDoItem.addEventListener("click", function(e) {
		console.log(e);
	});
}

function toggleListVisibility(toDoList) {
	var listArea = document.querySelector(".list-area");
	if(toDoList.children.length >= 1) {
		//remove hidden
		listArea.classList.remove("hidden");
	} else {
		//add hidden
		listArea.classList.add("hidden");
	}
}



window.onload = function() {
	var form = document.querySelector("form");
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		
		var toDoList = document.querySelector(".todo-list");
		
		var formInput = document.querySelector("#item-input");

		var inputValue = formInput.value;
		
		createToDoItem(toDoList, inputValue);

		toggleListVisibility(toDoList);

		formInput.value = "";
	});
}


















