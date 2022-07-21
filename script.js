import { render } from "/modules/render.js";
import { createProject } from "/modules/createProject.js";
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

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [
  { id: "1658393563103", name: "Work", todos: [] },
  { id: "1658393629453", name: "Personal", todos: [] },
];

//------- Visualize selected project || delete project------------//

let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);
projectContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-name")) {
    selectedProjectId = e.target.dataset.projectId;
    save();
    render();
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

render();
