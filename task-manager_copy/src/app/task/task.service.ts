import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() { }

  addTask(task: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks.push(task);
    this.saveTasksToLocalStorage(tasks);
  }

  getTasks(): Task[] {
    return this.getTasksFromLocalStorage();
  }

  getTask(index: number): Task {
    const tasks = this.getTasksFromLocalStorage();
    return tasks[index];
  }

  updateTask(index: number, updatedTask: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks[index] = updatedTask;
    this.saveTasksToLocalStorage(tasks);
  }

  deleteTask(index: number): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks.splice(index, 1);
    this.saveTasksToLocalStorage(tasks);
  }

  private getTasksFromLocalStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
