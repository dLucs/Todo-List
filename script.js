import { render } from "/modules/render.js";
import { createProject } from "/modules/createProject.js";
import { createTodo } from "/modules/createTodo.js";
import {
  save,
  LOCAL_STORAGE_PROJECT_KEY,
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,
} from "/modules/storage.js";

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

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [
  { id: "1658393563103", name: "Work", todos: [] },
  { id: "1658393629453", name: "Personal", todos: [] },
];

let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);

const selectedProject = projects.find(
  (project) => project.id === selectedProjectId
);

//------- Visualize selected project || delete project------------//

projectContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-name")) {
    selectedProjectId = e.target.dataset.projectId;

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
  const todoDate = newTodoDate.value;
  if (todoDate == null || todoDate === "") return;
  const todo = createTodo(todoName, todoDate);
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

render();
