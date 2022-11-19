const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const totalTodos = document.getElementById("total");
const completedTodos = document.getElementById("complete");
const todoUl = document.getElementById("toDos");

let todoList = [
    { name: "Ir al supermercado", id: 1, completed: false },
    { name: "leer Paper", id: 2, completed: false },
    { name: "Ir al gimnasio", id: 3, completed: false },
];

let todoId = todoList.length;

const render = (arr) => {
    let list = "";
    let completedTotal = 0;
    todoUl.innerHTML = "";
    arr.forEach((item) => {
        let status = "";
        let completedStyle = "";
        if (item.completed) {
            status = "checked";
            completedTotal++;
            completedStyle = `class="completed-todo"`;
        }
        let template = `<li class="todo"><span class="todo-id">${item.id}</span><p ${completedStyle}>${item.name}</p><div class="todo-btns"><input class="todo-check" data-update="${item.id}" type="checkbox" ${status}> <button data-delete="${item.id}">❌</button></div></li>`;
        list += template;
    });
    todoUl.innerHTML = list;
    totalTodos.textContent = arr.length;
    completedTodos.textContent = completedTotal;
    console.log(todoList);
};
render(todoList);

const addTodo = () => {
    if (todoInput.value != "") {
        todoId++;
        let newTodo = {
            name: todoInput.value,
            id: todoId,
            completed: false,
        };
        todoList.push(newTodo);
        render(todoList);
        todoInput.value = "";
    } else {
        alert("Debes ingresar un todo");
    }
};

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

const deleteTodo = (e) => {
    if (e.target.dataset.delete) {
        const id = e.target.dataset.delete;
        const index = todoList.findIndex((item) => item.id == id);
        todoList.splice(index, 1);
        render(todoList);
    }
};

const updateTodo = (e) => {
    if (e.target.dataset.update) {
        const id = e.target.dataset.update;
        const index = todoList.findIndex((item) => item.id == id);
        todoList[index].completed = !todoList[index].completed;

        render(todoList);
    }
};

todoUl.addEventListener("click", (e) => {
    deleteTodo(e);
    updateTodo(e);
});