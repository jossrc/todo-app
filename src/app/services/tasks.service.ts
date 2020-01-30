import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];

  constructor() {
    this.tasks = this.getTasks();
   }

  createNewTask(desc: string) {

    const task: Task = {
      description : desc,
      isCompleted: false
    };
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return this.tasks;
  }

  deleteTask(task: Task) {

    const item = this.tasks.indexOf(task);

    this.tasks.splice(item, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return this.tasks;
  }

  changeToCompleted(task: Task, really?: boolean) {

    if (really) {
      task.isCompleted = true;
    } else {
      task.isCompleted = false;
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    if (localStorage.getItem('tasks')) {
      return JSON.parse(localStorage.getItem('tasks'));
    } else {
      return [];
    }
  }


}

export interface Task {
  description: string;
  isCompleted: boolean;
}
