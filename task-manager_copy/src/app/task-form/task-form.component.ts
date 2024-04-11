import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() formSubmit = new EventEmitter<Task>();

  onSubmit(form: NgForm): void {
    const task: Task = {
      name: form.value.name,
      description: form.value.description,
      dueDate: form.value.dueDate,
      status: false
    };
    this.formSubmit.emit(task);
    form.reset();
  }
}
