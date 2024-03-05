import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient, private userService: UserService) { }

  getTasks(): Observable<Task[]> {
    const userId = this.userService.getCurrentUserId();
    const url = `${this.tasksUrl}?userId=${userId}`;
    return this.http.get<Task[]>(url);
  }

  
  getTaskById(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  createTask(task: Task): Observable<Task> {
    const userId = this.userService.getCurrentUserId();
    if (userId === null) {
      throw new Error('User not Authenticated'); 
    }

    const taskWithUserId = { ...task, userId };
    
    return this.http.post<Task>(this.tasksUrl, taskWithUserId);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(id: number): Observable<unknown> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url);
  }
}
