import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() { }

  // Add a new task
  addTask(task: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks.push(task);
    this.saveTasksToLocalStorage(tasks);
  }

  // Get all tasks
  getTasks(): Task[] {
    return this.getTasksFromLocalStorage();
  }

  // Get a single task by index
  getTask(index: number): Task {
    const tasks = this.getTasksFromLocalStorage();
    return tasks[index];
  }

  // Update an existing task
  updateTask(index: number, updatedTask: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks[index] = updatedTask;
    this.saveTasksToLocalStorage(tasks);
  }

  // Delete a task
  deleteTask(index: number): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks.splice(index, 1);
    this.saveTasksToLocalStorage(tasks);
  }

  // Retrieve tasks from local storage
  private getTasksFromLocalStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  // Save tasks to local storage
  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
