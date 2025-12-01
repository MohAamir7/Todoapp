function loadstodo(){
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todosList":[]};
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todoText){
    const todos = loadstodo();
    todos.todosList.push(todoText);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function appendHtml(todoText){
    const taskList = document.getElementById("taskList");
    const todo = document.createElement('li');
    todo.textContent = todoText;
    taskList.appendChild(todo);
}
document.addEventListener("DOMContentLoaded",()=>{
    const todoInput = document.getElementById("textinput");
    const submitButton = document.getElementById("taskbutton");

    submitButton.addEventListener("click",()=>{
        const todoText = todoInput.value;
        if(todoText ==''){
            alert("Please write something for todo");
        }else{
            addTodoToLocalStorage(todoText);
            appendHtml(todoText);
            todoInput.value = '';
        }
    });

    todoInput.addEventListener("change",(Event)=>{
        const todoText = Event.target.value;
        Event.target.value = todoText.trim();
        console.log(Event.target.value);
    });

    const todos =loadstodo();
    todos.todosList.forEach(todo => {
        const newItem = document.createElement('li');
        newItem.textContent = todo;
        taskList.appendChild(newItem);
        
    });
});