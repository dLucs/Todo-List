import {
  projects,
  projectContainer,
  selectedProjectId,
  projectDisplayContainer,
} from "/script.js";

function render() {
  clearElement(projectContainer);
  renderProjects();

  if (selectedProjectId == null) {
    projectDisplayContainer.style.display = "none";
  } else {
  }
}

function renderProjects() {
  projects.forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.dataset.projectId = project.id;
    projectElement.classList.add("project-name");
    projectElement.innerHTML = `${project.name}<button class="del-project" data-del-project>☒</button>`;
    if (project.id === selectedProjectId) {
      projectElement.classList.add("active-project");
    }
    projectContainer.appendChild(projectElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export { render };
