/*
# ========================================================
# = Initialization
# ========================================================
*/

// An array for our todos.
let todos = [];
// An array for our completed todos.
let completed = [];

// Tell the browser to run init when the html is loaded.
window.onload = init;

function init() {
    // Add event listener functions that get called whenever a user interacts
    // with the respective element.

    document.querySelector('#add-todo-button')
        .addEventListener('click', addTodo);
    
    document.querySelector('#remove-todo-button')
        .addEventListener('click', removeTodo);

    document.querySelector('#complete-todo-button')
        .addEventListener('click', completeTodo);

    document.querySelector('#clear-todos-button')
        .addEventListener('click', clearTodos);

    document.querySelector('#remove-completed-button')
        .addEventListener('click', removeCompleted);

    document.querySelector('#mark-uncomplete-button')
        .addEventListener('click', markUncomplete);

    document.querySelector('#clear-completed-button')
        .addEventListener('click', clearComplete);
}


/*
# ========================================================
# = List Management
# ========================================================
*/


function addTodo(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value of todo input box.
    let add = document.querySelector('#new-todo').value;
    // Put that value at the end of our list.
    if (add !==''){
    todos.push(add);}
    // Update our html.
    updateTodosOl();
    // Reset all input fields.
    resetAllInputs();
    console.log(todos);
}

function removeTodo(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's removal index input box.
    let remove = document.querySelector('#todo-removal-index').value;
    let index = remove - 1;
    // Remove todo at that index.
    if(isNaN(remove)  || remove === '' || remove < 1){
        resetAllInputs();
    }
    else {
    todos.splice(index, 1);
    }
                  
    // Update our html.
    updateTodosOl();
    // Reset all input fields.
    resetAllInputs();
    console.log(todos);
}

function completeTodo(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's todo completion index input box.
    let compTodo = document.querySelector('#todo-complete-index').value;
    let index = compTodo - 1;
    // Move todo at that index to the completed list.
    if(isNaN(compTodo)  || compTodo === '' || compTodo < 1){
        resetAllInputs();
    }
    else {
    completed = completed.concat(todos.splice(index, 1));
    }
    // console.log(todos);
    // console.log(completed);

    // Update our html.
    updateTodosOl();
    updateCompletedOl();
    // Reset all input fields.
    resetAllInputs();
    console.log(todos);
    console.log(completed);
}

function clearTodos(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Clear all todos from the list.
    todos = [];
    // Update our html.
    updateTodosOl();
    console.log(todos);
}

function removeCompleted(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's removal index input box.
    let removeComp = document.querySelector('#completed-removal-index').value;
    // Remove todo at that index.
    completed.splice(removeComp, 1);
    // Update our html.
    updateCompletedOl();
    // Reset all input fields.
    resetAllInputs();
}

function markUncomplete(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's todo completion index input box.
    let markUnc = document.querySelector('#mark-uncomplete-index').value;
    // Move todo at that index to the completed list.
    todos = todos.concat(completed.splice(markUnc, 1));
    // Update our html.
    updateTodosOl();
    updateCompletedOl();
    // Reset all input fields.
    resetAllInputs();
}

function clearComplete(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Clear all complete todos from the list.
    completed = [];
    // Update our html.
    updateCompletedOl();
}


/*
# ========================================================
# = HTML Management
# ========================================================
*/


// Use this function to reset all input fields.
function resetAllInputs() {
    // Find all input fields.
    const inputs = document.querySelectorAll('input');
    
    // For each one, set its current value to an empty string.
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

// Use this function to update the todos ol to reflect the state of our todos
// list.
function updateTodosOl() {
    // Grab the todos ol.
    const ol = document.querySelector('#todos-list');
    // Clear it of children nodes.
    _clearOl(ol);
    // Re-populate it with everything from the todos array.
    _addItemsToOl(todos, ol);
}

// Use this function to update the completed ol to reflect the state of our completed
// list.
function updateCompletedOl() {
    // Grab the completed ol.
    const ol = document.querySelector('#completed-list');
    // Clear it of children nodes.
    _clearOl(ol);
    // Re-populate it with everything from the completed array.
    _addItemsToOl(completed, ol);
}

// Clear all children of the given ol.
// Used INTERNALLY by the ol-updating functions above.
function _clearOl(ol) {
    // As long as our ol isn't empty, shift off the first node.
    while(ol.hasChildNodes()) {
        ol.removeChild(ol.firstChild);
    }
}

// Add all items given to the ol given.
// Used INTERNALLY by the ol-updating functions above.
function _addItemsToOl(items, ol) {
    for(let i = 0; i < items.length; i++) {
        // For every item in the list, add it to the given ol.
        _addItemToOl(items[i], ol);
    }
}

// Append any item given to the given ol.
// Used INTERNALLY by _addItemsToOl
function _addItemToOl(item, ol) {
    // Make a new li.
    const newLi = document.createElement('li');
    // Add our item to it.
    newLi.innerText = item;
    // Append it to the given ol.
    ol.appendChild(newLi);
}