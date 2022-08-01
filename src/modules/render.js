import {
  projects,
  projectContainer,
  selectedProjectId,
  projectDisplayContainer,
  projectTitle,
  selectedProject,
  projectCount,
  todosContainer,
  todoTemplate,
} from "/src/index.js";

function render() {
  clearElement(projectContainer);
  renderProjects();

  if (selectedProjectId == null) {
    projectDisplayContainer.style.display = "none";
  } else {
    projectDisplayContainer.style.display = "";
    projectTitle.innerText = selectedProject.name;
    renderTodoCount(selectedProject);
    clearElement(todosContainer);
    renderTodos(selectedProject);
  }
}

function renderTodos(selectedProject) {
  selectedProject.todos.forEach((todo) => {
    const todoElement = document.importNode(todoTemplate.content, true);
    const checkbox = todoElement.querySelector("input");
    checkbox.id = todo.id;
    checkbox.checked = todo.complete;
    const label = todoElement.querySelector("label");
    label.htmlFor = todo.id;
    label.append(todo.name);
    const para = todoElement.querySelector("p");
    para.id = todo.id;
    para.textContent = todo.date;
    const button = todoElement.querySelector("button");
    button.id = todo.id;
    const del = todoElement.querySelector(".delete");
    del.id = todo.id;
    const urgent = todoElement.querySelector("ins");
    urgent.id = todo.id;
    urgent.textContent = todo.priority;
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

function renderTodoCount(selectedProject) {
  const incompleteTodosCount = selectedProject.todos.filter(
    (todo) => !todo.complete
  ).length;
  const todosString = incompleteTodosCount === 1 ? "task" : "tasks";
  projectCount.innerText = `${incompleteTodosCount} ${todosString} remaining`;
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
