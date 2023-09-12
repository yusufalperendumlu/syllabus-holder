import { createReducer, on } from "@ngrx/store";
import { Lesson } from "src/app/models/lesson";
import { addLesson, removeLesson } from "../actions/lesson.action";

//State Type
export interface IState {
    data: Lesson[];
}

//Initial State
export const initialLessonState: IState = {
    data: getLessonsFromLocalStorage() || [] // Önce yerel depodan dersleri al veya boş bir dizi oluştur
}

// Function to get lessons from local storage
function getLessonsFromLocalStorage(): Lesson[] | null {
    const storedData = localStorage.getItem('lessons');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return null;
}

// Function to save lessons to local storage
function saveLessonsToLocalStorage(lessons: Lesson[]) {
    localStorage.setItem('lessons', JSON.stringify(lessons));
}

//Reducer
export const lessonReducer = createReducer(initialLessonState,
    on(addLesson, (state, lesson) => {
        const newState: IState = {
            data: [...state.data, lesson]
        }
        saveLessonsToLocalStorage(newState.data); // Eklenen dersleri yerel depoya kaydet
        return newState;
    }),
    on(removeLesson, (state, lesson) => {
        const deleteLessonIndexNo = state.data.findIndex(l => l.id === lesson.id);
        if (deleteLessonIndexNo !== -1) {
            const newState: IState = {
                data: [...state.data]
            };
            newState.data.splice(deleteLessonIndexNo, 1);
            saveLessonsToLocalStorage(newState.data); // Silinen dersleri yerel depodan kaldır
            return newState;
        }
        return state;
    })
);
