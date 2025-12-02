function loadstodo(){
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todosList":[]};
    // console.log(todos);
    return todos;
}
function refreshtodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoToLocalStorage(todo){
    const todos = loadstodo();
    todos.todosList.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function executefilter(Event){
    const taskList = document.getElementById('taskList');
    const element = Event.target;
    const value = element.getAttribute('data-filter');
    // console.log(taskList,element,value);
    taskList.innerHTML = '';
    const task = loadstodo();
    if(value == "all"){
        // console.log(taskList);
        task.todosList.forEach(todo => {
        appendHtml(todo);
        
    });

    }else if(value == "pending"){
        task.todosList.forEach(todo => {
            if(todo.isCompleted != true){
                appendHtml(todo);
            }  
    });

    }else{
         task.todosList.forEach(todo => {
            if(todo.isCompleted == true){
                appendHtml(todo);
            } } )

    }

}
function resetHtml(tasks){
    const todoList = document.getElementById('taskList');
    todoList.innerHTML = "";
    tasks.todosList.forEach(todo =>{
        appendHtml(todo);
    });

}
function toggleBtn(e){
    console.log("toggling");
    const taskItem = e.target.parentElement.parentElement;
    const taskId = taskItem.getAttribute("data-id");
    let tasks = loadstodo();
    console.log(tasks.todosList)
    tasks.todosList.forEach(todo=>{
        if(todo.id == taskId){
            todo.isCompleted = !todo.isCompleted;
        }
    });
    refreshtodos(tasks);
    resetHtml(tasks);
}
function deletetodo(e){
    console.log("deleting");
    const taskItem = e.target.parentElement.parentElement;
    const taskId = taskItem.getAttribute("data-id");
    let tasks = loadstodo(); 
    tasks.todosList = tasks.todosList.filter(task => task.id != taskId);
    refreshtodos(tasks);
    resetHtml(tasks);

}
function editTodo(e){
     console.log("toggling");
    const taskItem = e.target.parentElement.parentElement;
    const taskId = taskItem.getAttribute("data-id");
    let tasks = loadstodo();
    const response = prompt("what is the new task you want to set");
    console.log(tasks.todosList)
    tasks.todosList.forEach(todo=>{
        if(todo.id == taskId){
            todo.text = response;
        }
    });
    refreshtodos(tasks);
    resetHtml(tasks);

}
function addNewTodo(){
    const todoInput = document.getElementById("textinput");
    const todoText = todoInput.value;
        if(todoText ==''){
            alert("Please write something for todo");
        }else{
            todos = loadstodo();
            let id = todos.todosList.length;
            addTodoToLocalStorage({text:todoText,isCompleted:false,id});
            appendHtml({text:todoText,isCompleted:false,id});
            todoInput.value = '';
        }
}
function appendHtml(todo){
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement('li');
    taskItem.setAttribute("data-id",todo.id);
    const wrapper = document.createElement('div');
    const taskdiv = document.createElement('div');
    taskdiv.classList.add("tasktext");
    wrapper.classList.add('taskButtons');
    taskItem.textContent = todo.text;
    taskItem.classList.add("taskItem");

    const editbtn = document.createElement('Button');
    editbtn.textContent = "Edit";
    editbtn.classList.add('editbtn');
    editbtn.addEventListener("click",editTodo);

    const deletebtn = document.createElement('Button');
    deletebtn.textContent = 'Delete';
    deletebtn.classList.add('deletebtn');
    deletebtn.addEventListener("click",deletetodo);

    const completedbtn = document.createElement('Button');
    completedbtn.textContent = (todo.isCompleted) ? "Reset" : "Completed";
    completedbtn.classList.add('completedbtn');
    if(todo.isCompleted){
        taskdiv.classList.add('completed');
    }
    
    completedbtn.addEventListener("click",toggleBtn)

    wrapper.appendChild(editbtn);
    wrapper.appendChild(deletebtn);
    wrapper.appendChild(completedbtn);

    taskItem.appendChild(wrapper);
    taskdiv.appendChild(taskItem)
    taskList.appendChild(taskdiv);    
}
document.addEventListener("DOMContentLoaded",()=>{
    const todoInput = document.getElementById("textinput");
    const submitButton = document.getElementById("taskbutton");
    let todos = loadstodo();
    const filterbtn = document.getElementsByClassName("filter-btn");
    // console.log(filterbtn);
    for(btn of filterbtn){
        btn.addEventListener("click",executefilter);
    }
    submitButton.addEventListener("click",()=>{
        addNewTodo();
        
    });

    todoInput.addEventListener("change",(Event)=>{
        const todoText = Event.target.value;
        Event.target.value = todoText.trim();
        console.log(Event.target.value);
    });

    // const todos =loadstodo();
    todos.todosList.forEach(todo => {
        appendHtml(todo);
        
    });
    document.addEventListener("keypress",(Event)=>{
        if(Event.code == 'Enter'){
            addNewTodo();

        }

    })
    
});