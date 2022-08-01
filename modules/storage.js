import { projects, selectedProjectId } from "/modules/script.js";

const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = "todo.selectedProjectId";
const LOCAL_STORAGE_PROJECT_KEY = "todo.projects";

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
  localStorage.setItem(
    LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,
    selectedProjectId
  );
}

export {
  save,
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,
  LOCAL_STORAGE_PROJECT_KEY,
};
