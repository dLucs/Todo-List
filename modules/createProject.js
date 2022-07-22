function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    todos: [{ id: "sdsdsd", name: "test", complete: true, date: "12/01/22" }],
  };
}
export { createProject };
