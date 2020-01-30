import { Component, OnInit } from '@angular/core';
import { TasksService, Task } from '../../services/tasks.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pendiente',
  templateUrl: './pendiente.component.html',
  styleUrls: ['./pendiente.component.css']
})
export class PendienteComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private ts: TasksService) {
    this.tasks = this.ts.tasks.filter(task => !task.isCompleted);
   }

  ngOnInit() {
  }

  addTask(desc: string) {

    if (desc.trim()) {
      this.ts.createNewTask(desc);
      this.tasks = this.ts.tasks.filter(t => !t.isCompleted);
    }
  }

  removeTask(task: Task) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
    confirmButton: 'btn btn-success ',
    cancelButton: 'btn btn-danger mr-3'
    },
  buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: '¿Está seguro?',
    text: 'No completaste esta tarea',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
  if (result.value) {
    this.ts.deleteTask(task);
    this.tasks = this.ts.tasks.filter(t => !t.isCompleted);
    swalWithBootstrapButtons.fire(
      'Eliminado',
      'Esta tarea ah sido eliminada ',
      'success'
    );
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelado',
      'Tú puedes, continúa :)',
      'error'
    );
  }
});

  }

  taskCompleted(task: Task) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
    confirmButton: 'btn btn-success ',
    cancelButton: 'btn btn-danger mr-3'
    },
  buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: '¿Completaste la tarea?',
    text: 'Pudiste completarlo',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
  if (result.value) {
    this.ts.changeToCompleted(task, true);
    this.tasks = this.ts.tasks.filter(t => !t.isCompleted);
    swalWithBootstrapButtons.fire(
      'Felicidades',
      'Has completado con éxito la tarea',
      'success'
    );
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      '¿Qué pasó?',
      'Tú puedes, continúa :)',
      'error'
    );
  }
});

  }
}
