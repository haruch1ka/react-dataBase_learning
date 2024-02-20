import Todo from "../general/Todo";
import Database from "./Database";

export default class TodoTable extends Database {
  public async createTodo(todo: Todo) {
    await this.dbRun(`INSERT INTO todo (id, content, due_date, status) VALUES ("${todo.getId()}", "${todo.getContent()}", "${todo.getDueDate()}", "${todo.getStatus()}")`);
  }

  public async selectTodoById(id: string) {
    const data = await this.dbGet(`SELECT * FROM todo WHERE id = "${id}"`);
    return new Todo(data.id, data.content, data.due_date, data.status);
  }
  public async deleteAllTodos() {
  await this.dbRun(`DELETE FROM todo`);
}
}