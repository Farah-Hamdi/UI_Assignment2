import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task.model';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showTaskForm: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onDeleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
  }

  onToggleTaskStatus(index: number): void {
    const updatedTask = { ...this.tasks[index] };
    updatedTask.status = !updatedTask.status;
    this.taskService.updateTask(index, updatedTask);
  }

  onAddTaskClicked(): void {
    this.showTaskForm = true;
  }
  onSubmitTaskForm(task: Task): void {
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
    this.showTaskForm = false;
  }
}
