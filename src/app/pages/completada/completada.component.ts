import { Component, OnInit } from '@angular/core';
import { Task, TasksService } from '../../services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completada',
  templateUrl: './completada.component.html',
  styleUrls: ['./completada.component.css']
})
export class CompletadaComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private ts: TasksService) {
    this.tasks = this.ts.tasks.filter(task => task.isCompleted);
  }

  ngOnInit() {
  }

  removeTask(task: Task) {
    Swal.fire({
    icon: 'success',
    title: 'Tarea eliminada',
  });
    this.ts.deleteTask(task);
    this.tasks = this.ts.tasks.filter(t => t.isCompleted);
  }

  isCompleted(task: Task) {

    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
    confirmButton: 'btn btn-success ',
    cancelButton: 'btn btn-danger mr-3'
    },
  buttonsStyling: false
  });

    swalWithBootstrapButtons.fire({
    title: '¿No lo terminaste?',
    text: 'Confirma si lo completaste',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
  if (result.value) {
    swalWithBootstrapButtons.fire(
      'Me asustaste',
      'Pensé que no lo habías completado',
      'error'
    );
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    this.ts.changeToCompleted(task);
    this.tasks = this.ts.tasks.filter(t => t.isCompleted);
    swalWithBootstrapButtons.fire(
      '¿Qué pasó?',
      'Tú puedes, continúa :)',
      'success'
    );
  }
});

  }

}
