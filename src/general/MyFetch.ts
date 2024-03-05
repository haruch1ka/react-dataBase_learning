import Todo from "./Todo";
import TodoUpdateData from "./TodoUpdateData";
import TodoDeleteData from "./TodoDeleteData";

type MyFetchBody = Todo | TodoUpdateData | TodoDeleteData | null;

export default class MyFetch {
  private method: string;
  private url: string;
  private body: MyFetchBody;

  constructor(method: string, url: string, body: MyFetchBody) {
    this.method = method;
    this.url = url;
    this.body = body;
  }

  public async fetch() {
    if (this.method === "POST" && this.url === "http://127.0.0.1:3000/api/todos/") {
      await this.createTodo();
    }
    if (this.method === "GET" && this.url === "http://127.0.0.1:3000/api/todos/running/") {
      return await this.selectAllRunningTodos();
    }
    if (this.method === "PUT" && this.url === "http://127.0.0.1:3000/api/todos/") {
      await this.updateTodo();
    }
    if (this.method === "DELETE" && this.url === "http://127.0.0.1:3000/api/todos/") {
      await this.deleteTodo();
    }
    if (this.method === "PATCH" && this.url === "http://127.0.0.1:3000/api/todos/") {
      await this.changeTodo();
    }
    if (this.method === "GET" && this.url === "http://127.0.0.1:3000/api/todos/completed/") {
      return await this.selectAllRunningTodos();
    }
  }

  public async createTodo() {
    await fetch(this.url, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.body),
    });
  }
  public async selectAllRunningTodos() {
    const todos: Todo[] = [];
    const response = await fetch(this.url, { method: this.method });
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      todos.push(new Todo(data[i].id, data[i].content, data[i].due_date, data[i].status));
    }
    return todos;
  }
  public async updateTodo() {
    await fetch(this.url, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.body),
    })
      .then((response) => {
        console.log("通信成功:del");
        console.log(response);
        if (!response.ok) {
          console.error("サーバーエラー");
        }
        // ここに成功時の処理を記述
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  }

  public async deleteTodo() {
    await fetch(this.url, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.body),
    })
      .then((response) => {
        console.log("通信成功:del");
        console.log(response);
        if (!response.ok) {
          console.error("サーバーエラー");
        }
        // ここに成功時の処理を記述
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  }
  public async changeTodo() {
    await fetch(this.url, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.body),
    });
  }
}
