import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { Todo } from '../../models/user';

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
  styleUrl: './todo.css',
})
export class TodoComponent {
  todos: Todo[] = [];
  newTaskText = signal('');

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  addTask() {
    const text = this.newTaskText().trim();
    if (text) {
      this.todoService.addTodo({ title: text, completed: false });
    }
    this.newTaskText.set('');
  }

  toggleTask(index: number) {
    this.todoService.switchTodoCompletion(index);
  }

  removeTask(id: number) {
    this.todoService.deleteTodo(id);
  }

  get completedCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get totalCount(): number {
    return this.todos.length;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}
