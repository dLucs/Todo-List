function createTodo(name, date) {
  return {
    id: Date.now().toString(),
    name: name,
    date: date,
    urgent: false,
    complete: false,
  };
}
export { createTodo };
