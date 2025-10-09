import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {
  newTaskText = signal('');
  todos = signal<TodoItem[]>([
    { id: 1, text: 'Review project proposal', completed: false },
    { id: 2, text: 'Prepare presentation slides', completed: false },
    { id: 3, text: 'Respond to emails', completed: false },
    { id: 4, text: 'Schedule team meeting', completed: false }
  ]);

  private nextId = 5;

  addTask() {
    const text = this.newTaskText().trim();
    if (text) {
      this.todos.update(todos => [
        ...todos,
        { id: this.nextId++, text, completed: false }
      ]);
      this.newTaskText.set('');
    }
  }

  toggleTask(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  removeTask(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  get completedCount(): number {
    return this.todos().filter(todo => todo.completed).length;
  }

  get totalCount(): number {
    return this.todos().length;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}