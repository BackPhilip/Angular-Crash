import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() editTaskItem?: Task;
  @Output() updateTask: EventEmitter<Task> = new EventEmitter();
  @Output() closeEditTask: EventEmitter<Task> = new EventEmitter();
  id?: number;
  text!: string;
  day!: string;
  time!: string;
  reminder: boolean = false;

  constructor() 
  { 
    
  }

  ngOnInit(): void {
  }

  ngOnChanges()
  {
    if (this.editTaskItem != undefined)
    {
      this.id = this.editTaskItem!.id;
      this.text = this.editTaskItem!.text;
      this.day = this.editTaskItem!.day;
      this.time = this.editTaskItem!.time;
      this.reminder = this.editTaskItem!.reminder;
    }
  }

  onSubmit()
  {
    const newTask = {
      id: this.id,
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder
    }
    this.updateTask.emit(newTask);
    this.editTaskItem = undefined;
  }

  onClose()
  {
    this.closeEditTask.emit();
  }
}
