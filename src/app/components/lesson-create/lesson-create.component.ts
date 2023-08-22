import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/models/lesson';
import { addLesson } from 'src/app/stateManagement/actions/lesson.action';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  constructor(private store: Store<Lesson>) { }
  lesson: Observable<string>;
  ngOnInit(): void {
    this.lesson = this.store.select("lesson");
  }

  createLesson(id: any, lesson: any, explanation: any) {
    if (id && lesson && explanation) {  
      const l: Lesson = new Lesson();
      l.id = parseInt(id, 10);
      l.explanation = explanation;
      l.lesson = lesson;
      this.store.dispatch(addLesson(l));
    } else {
      alert("Id, ders adı ve açıklama boş olmamalıdır.");
    }
  }
}

