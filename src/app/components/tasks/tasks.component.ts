import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
// import { TASKS } from '../../../app/components/mock-tasks';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
  this.taskService.getTasks().subscribe((task) => {
    this.tasks = task;
  });
  }

  deleteTask(task : Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    });  
  }

  toggleReminder(task : Task) {
    task.reminder = !task.reminder;
    console.log(task.reminder);
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task : Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
    });
    
  }
}
