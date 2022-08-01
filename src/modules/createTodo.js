function createTodo(name, date, priority) {
  return {
    id: Date.now().toString(),
    name: name,
    date: date,
    priority: priority,
    complete: false,
  };
}
export { createTodo };
