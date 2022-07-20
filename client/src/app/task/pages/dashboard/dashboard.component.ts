import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/helpers/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tasks: Task[] = [];

  constructor(
    private ctrlTask: TaskService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks(page = 1): any {
    this.ctrlTask.getTasks().then(res => {
      this.tasks = res.data.docs;
    });
  }

}
