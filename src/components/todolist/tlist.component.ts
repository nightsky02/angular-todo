import {Component} from "@angular/core";
import {ITodo} from "../../model/ITodo";

type SortData = {
  lastLength: number,
  sortType: string
}

@Component({
  selector: 'app-todolist',
  templateUrl: 'tlist-component.html'
})
export class TodoListComponent {
  public todos: ITodo[] = []
  public selectedTodos: ITodo[] = []
  public sortData: SortData = {
    lastLength: 0,
    sortType: 'None'
  }

  public onAddTodo(title: string, description: string) {
    if (title.length <= 0) {
      console.log('cannot add todo without title')
      return
    }

    this.todos.push({
      title: title,
      description: description,
      id: Math.random().toString(),
      isSelected: false
    })
    this.sort(this.sortData.sortType)
  }

  public selectTodo(todo: ITodo) {
    if (this.containsTodo(todo.id, this.selectedTodos)) {
      this.selectedTodos = this.removeTodoFromCollection(todo.id, this.selectedTodos)
      todo.isSelected = false
      return
    }
    todo.isSelected = true
    this.selectedTodos.push(todo)
  }

  public deleteTodos() {
    this.selectedTodos.forEach((currentTodo: ITodo) => {
      this.todos = this.removeTodoFromCollection(currentTodo.id, this.todos)
    })
    this.selectedTodos = []
  }

  public parseFindResult(result: ITodo[]) {
    this.selectedTodos.forEach((i: ITodo) => {
      i.isSelected = false
    })
    this.selectedTodos = []

    result.forEach((todo: ITodo) => {
      todo.isSelected = true
      this.selectedTodos.push(todo)
    })
  }

  public sort(type: string) {
    if (type === this.sortData.sortType && this.todos.length === this.sortData.lastLength)
      return
    this.sortData.sortType = type
    this.sortData.lastLength = this.todos.length
    if (type === 'up')
      this.sortUp()
    else if (type === 'rev')
      this.todos = this.sortUp().reverse()
  }

  private sortUp(): ITodo[] {
    return this.todos.sort((a: ITodo, b: ITodo) => {
      if (a.title[0] < b.title[0])
        return -1
      return 0
    })
  }

  private containsTodo(id: string, collection: ITodo[]) {
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].id === id)
        return true
    }
    return false
  }

  private removeTodoFromCollection(id: string, collection: ITodo[]): ITodo[] {
    return collection.filter((todo) => todo.id != id)
  }
}
