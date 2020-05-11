import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { TodoModel } from './todo.model';

const api = environment.baseAppUrl;

@Injectable({providedIn: 'root'})
export class TodosService{
    constructor(private http: HttpClient){}

    getTodos(){
        return this.http.get<TodoModel[]>(api + '/todos');
    }

    completeTodo(id: number){
        return this.http.put(api + '/todos/' + id, null);
    }
    

    deleteTodo(id: number){
        return this.http.delete(api + '/todos/' + id);
    }

    addTodo(todo: TodoModel){
        return this.http.post<TodoModel>(api + '/todos', todo);
    }

}