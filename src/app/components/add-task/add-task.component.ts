import { Component, OnInit, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  time!: string;
  reminder: boolean = false;
  locale!: string;
  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void 
  {
    this.fillTextBoxes();
  }

  onSubmit()
  {
    if (!this.text)
    {
      alert('Please add a task!')
      return;
    }
    else if (!this.day)
    {
      alert('Please Enter a Time!')
      return;
    }

    else
    {
      const newTask = {
        text: this.text,
        day: this.day,
        time: this.time,
        reminder: this.reminder
      }
      
      this.fillTextBoxes();
      this.onAddTask.emit(newTask);
    }
  }

  fillTextBoxes()
  {
    this.text = '';
    this.reminder = false;

    this.locale = "en-ZA";
    const datepipe: DatePipe = new DatePipe(this.locale);

    let formattedDate = datepipe.transform(new Date(), 'yyyy-MM-dd');
    let formattedTime = datepipe.transform(new Date(), 'HH:mm');

    this.day = formattedDate!;
    this.time = formattedTime!;
  }
}
