import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';
import { TodoModel } from './todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: TodoModel[];
  addMode: boolean;
  name: string;
  description: string;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todosService.getTodos().subscribe(t => {
      this.todos = t;
      console.log(this.todos);
    });
  }

  completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe(
      () => { this.getTodos(); }
    )
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id).subscribe(
      () => { this.getTodos(); }
    )
  }

  add() {
    this.name = '';
    this.description = '';
    this.addMode = true;
  }

  save() {
    let todo = new TodoModel();
    todo.name = this.name;
    todo.description = this.description;

    this.todosService.addTodo(todo).subscribe(
      data => {
        this.addMode = false;
        this.todos.push(data);
      });
  }

  cancel() {
    this.addMode = false;
    this.name = '';
    this.description = '';
  }
}
