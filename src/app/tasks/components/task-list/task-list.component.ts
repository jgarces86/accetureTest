import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
    });
  }

  openTaskDialog(action: string, task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '450px',
      data:  task ? { ...task } : {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action === 'edit') {
        this.taskService.updateTask(result).subscribe(updatedTask => {
          const index = this.dataSource.data.findIndex(t => t.id === updatedTask.id);
          this.dataSource.data[index] = updatedTask;
          this.dataSource.data = [...this.dataSource.data]; 
        });
      } else {
        this.taskService.createTask(result).subscribe(newTask => {
          this.dataSource.data = [...this.dataSource.data, newTask]; 
        });
      }

      this.taskService.getTasks().subscribe(tasks => {
        this.dataSource = new MatTableDataSource(tasks);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  toggleStatus(task: Task) {
    const updatedTask = {...task, completed: !task.completed};
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.dataSource.data = this.dataSource.data.map(t => {
        if(t.id === task.id) {
          return updatedTask;
        }
        return t;
      });
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(t => t.id !== id);
    });
  }
}

// No olvides definir una interfaz Task para tipar tus tareas
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

