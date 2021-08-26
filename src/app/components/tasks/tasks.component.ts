import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  editTaskItem?: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task)
  {
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter((t) => t.id !== task.id)));
  }

  toggleReminder(task: Task)
  {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }

  addTask(task: Task)
  {
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }

  openEditTask(task: Task)
  {
    this.editTaskItem = task;
  } 

  updateTask(task: Task)
  {
    let count = 0;
    for (let item of this.tasks)
    {
      if (item.id == task.id)
      {
        this.tasks[count] = task;
      }
      ++count;
    }

    this.taskService.updateTask(task).subscribe();
  }

  closeEditTask()
  {
    this.editTaskItem = undefined;
  }
}
