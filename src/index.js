import { render } from "/src/modules/render.js";
import { createProject } from "/src/modules/createProject.js";
import { createTodo } from "/src/modules/createTodo.js";
import { reverseDate } from "/src/modules/reverseDate.js";
import {
  save,
  LOCAL_STORAGE_PROJECT_KEY,
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,
} from "/src/modules/storage.js";

export {
  projects,
  projectContainer,
  selectedProjectId,
  projectDisplayContainer,
  projectTitle,
  selectedProject,
  projectCount,
  todosContainer,
  todoTemplate,
};

const newProjectForm = document.querySelector("[data-new-project-form]");
const newProjectInput = document.querySelector("[data-new-project-input]");
const projectContainer = document.querySelector("[data-projects]");
const projectDisplayContainer = document.querySelector(
  "[data-project-display-container]"
);
const projectTitle = document.querySelector("[data-project-title]");
const projectCount = document.querySelector("[data-project-count]");
const todosContainer = document.querySelector("[data-todos]");
const todoTemplate = document.getElementById("todo-template");
const newTodoForm = document.querySelector("[data-new-todo-form]");
const newTodoInput = document.querySelector("[data-new-todo-input]");
const newTodoDate = document.querySelector("[data-new-todo-date]");
const newTodoPriority = document.querySelector("[data-new-todo-priority]");
const modal = document.querySelector("[data-modal]");
const modalForm = document.querySelector("[data-edit-todo-form]");
const editTodoInput = document.querySelector("[data-edit-todo-input]");
const editTodoDate = document.querySelector("[data-edit-todo-date]");
const editTodoPriority = document.querySelector("[data-edit-todo-priority]");
const filterTodo = document.querySelector("[data-filter-todo]");

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [
  {
    id: "1658393563103",
    name: "Work",
    todos: [
      {
        id: "1659608736269",
        name: "Finish Design presentation",
        date: "12-08-2022",
        priority: "Medium",
        complete: false,
      },
    ],
  },
  {
    id: "1658393629453",
    name: "Personal",
    todos: [
      {
        id: "1659533603673",
        name: "Call back Jane",
        date: "11-08-2022",
        priority: "High",
        complete: false,
      },
      {
        id: "1659595333452",
        name: "Buy Milk",
        date: "06-09-2022",
        priority: "Medium",
        complete: false,
      },
    ],
  },
];

let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);

let selectedProject = projects.find(
  (project) => project.id === selectedProjectId
);

//------- Visualize selected project || delete project------------//

projectContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-name")) {
    selectedProjectId = e.target.dataset.projectId;
    location.reload();
    save();
    render();
    location.reload();
  }
  if (e.target.matches(".del-project")) {
    const projectElement = e.target.parentElement;
    if (projectElement.dataset.projectId === selectedProjectId) {
      projects = projects.filter((project) => project.id !== selectedProjectId);
      selectedProjectId = null;
    }
  }

  save();
  render();

  console.log(projects);
});

//------- Add new project------------//

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === "") return;
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  save();
  render();
  console.log(projects);
});

//------- Add new todo------------//

newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = newTodoInput.value;
  if (todoName == null || todoName === "") return;
  const todoDate = reverseDate(newTodoDate.value);
  if (todoDate == null || todoDate === "") return;
  const todoPriority = newTodoPriority.value;
  const todo = createTodo(todoName, todoDate, todoPriority);

  newTodoInput.value = null;
  newTodoDate.value = null;

  const actualSelectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  actualSelectedProject.todos.push(todo);
  save();
  render();
  console.log(projects);
});

//------- Mark todo done------------//

todosContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const actualSelectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    const selectedTodo = actualSelectedProject.todos.find(
      (todo) => todo.id === e.target.id
    );
    selectedTodo.complete = e.target.checked;
    save();
    render();
  }
});

//------- Delete todo------------//
todosContainer.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    const actualSelectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    const selectedTodo = actualSelectedProject.todos.find(
      (todo) => todo.id === e.target.id
    );
    actualSelectedProject.todos = actualSelectedProject.todos.filter(
      (todo) => todo !== selectedTodo
    );

    save();
    render();
    location.reload();
    console.log(projects);
  }
});
//------- Edit new todo------------//

todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const actualSelectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    const selectedTodo = actualSelectedProject.todos.find(
      (todo) => todo.id === e.target.id
    );
    modal.style.display = "block";

    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const todoName = editTodoInput.value;
      if (todoName == null || todoName === "") return;
      const todoDate = reverseDate(editTodoDate.value);
      if (todoDate == null || todoDate === "") return;
      const todoPriority = editTodoPriority.value;
      selectedTodo.name = todoName;
      selectedTodo.date = todoDate;
      selectedTodo.priority = todoPriority;

      modal.style.display = "none";

      save();
      render();
      location.reload();
      console.log(projects);
    });
  }
});

//------- Filter Todos------------//
filterTodo.addEventListener("change", (e) => {
  const todos = document.querySelectorAll(".todo");
  const actualSelectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  const filteredTodos = actualSelectedProject.todos.filter(
    (todo) => todo.priority === e.target.value
  );

  if (e.target.value === "No filter") {
    location.reload();
  } else {
    todosContainer.innerHTML = "";
    filteredTodos.forEach((filteredTodo) => {
      const todoElement = document.importNode(todoTemplate.content, true);
      const checkbox = todoElement.querySelector("input");
      checkbox.id = filteredTodo.id;
      checkbox.checked = filteredTodo.complete;
      const label = todoElement.querySelector("label");
      label.htmlFor = filteredTodo.id;
      label.append(filteredTodo.name);
      const para = todoElement.querySelector("p");
      para.id = filteredTodo.id;
      para.textContent = filteredTodo.date;
      const button = todoElement.querySelector("button");
      button.id = filteredTodo.id;
      const del = todoElement.querySelector(".delete");
      del.id = filteredTodo.id;
      const urgent = todoElement.querySelector("ins");
      urgent.id = filteredTodo.id;
      urgent.textContent = filteredTodo.priority;
      if (urgent.textContent === "Low") {
        urgent.classList = "low";
      } else if (urgent.textContent === "Medium") {
        urgent.classList = "medium";
      } else {
        urgent.classList = "high";
      }
      todosContainer.appendChild(todoElement);
    });
  }
  console.log(filteredTodos);
});
//------- Close Modal------------//

modalForm.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "span") {
    modal.style.display = "none";
  }
});
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

render();

import _ from "lodash";
