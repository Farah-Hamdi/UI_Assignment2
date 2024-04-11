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

  task: Task = { name: '', description: '', dueDate: new Date(), status: false };
  isEditing: boolean = false;
  selectedTask: Task | null = null;
  indexSelected:number=0;
  showForm:boolean=false;


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  onDeleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.loadTasks();
    this.isEditing = false; // Reset editing state after deleting a task
  }

  onToggleTaskStatus(task: Task): void {
    task.status = !task.status;
    this.taskService.updateTask(this.tasks.indexOf(task), task);
  }

  onAddTaskClicked(): void {
    //this.selectedTask = null;
    this.showForm=true;
    this.isEditing = true;
  }

  onEditTaskClicked(i:number): void {
    this.showForm=true;
    //console.log("Selected task:", this.selectedTask);
    this.isEditing = true;
    console.log("isEditing:", this.isEditing);
    this.selectedTask=this.taskService.getTask(i);
    //this.isEditing=true;
    this.indexSelected=i;
    //this.task={ name: this.selectedTask.name, description: this.selectedTask.description, dueDate: this.selectedTask.dueDate, status: this.selectedTask.status }; // Reset the task object after submission

  }




  onSubmitTaskForm(task: Task): void {
    if (this.selectedTask !== null) {
      const index = this.indexSelected;
      //this.selectedTask=null;
      this.taskService.updateTask(index, task);
      this.taskService.deleteTask(index);
      this.taskService.addTask(task);
    } else {
      this.taskService.addTask(task);
    }
    this.loadTasks();
    this.selectedTask = null;
    this.isEditing = false;
    this.task = { name: '', description: '', dueDate: new Date(), status: false }; // Reset the task object after submission
    this.showForm = false;



  }

}
