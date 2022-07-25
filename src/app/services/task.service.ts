import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../store/models/Task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {AddTask} from '../store/actions/task.action';

const httpOptions = {
  method: '',
  body: '',
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    const tasks = store.select('task');
    console.log(tasks);
  }

  async getTasks(): Promise<Task[]> {
    const resp = await fetch(this.apiUrl);
    const payload = <Task[]>await resp.json();

    // this.store.dispatch(new TutorialActions.RemoveTutorial(index))
    const testTask = {id:100, text: 'Test', day: 'today', reminder: true };
    this.store.dispatch(new AddTask(testTask));

    return payload;
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  async updateTaskReminder(task: Task): Promise<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    httpOptions.body = JSON.stringify(task);
    httpOptions.method = 'PUT';

    const resp = await fetch(url, httpOptions);
    const updated = <Task>await resp.json();

    return updated;
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
