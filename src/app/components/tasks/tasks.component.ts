import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../store/models/Task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private store: Store<AppState>
  ) {
    store.select('task').subscribe(chuck => console.log(chuck));
  }

  async ngOnInit(): Promise<void> {
    this.tasks = await this.taskService.getTasks();
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  async toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    const updated = await this.taskService.updateTaskReminder(task);

    console.log(updated);
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
