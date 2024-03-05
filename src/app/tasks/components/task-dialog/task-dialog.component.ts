import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

export interface TaskData {
  id?: number; 
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  taskForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskData,
    private taskService: TaskService
  ) {
    this.isEditing = data && data.id != null;

    this.taskForm = this.fb.group({
      title: [this.isEditing ? data.title : '', Validators.required],
      description: [this.isEditing ? data.description : '', Validators.required],
      completed: [this.isEditing ? data.completed : false]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      let result = this.taskForm.value;
      if(this.isEditing){
        let id = this.data.id;
        this.dialogRef.close({
          id,
          ...this.taskForm.value
        });
      }
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
