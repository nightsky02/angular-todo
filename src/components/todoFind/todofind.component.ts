import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ITodo} from "../../model/ITodo";

@Component({
  selector: 'app-todo-finder',
  templateUrl: 'todofind.component.html'
})
export class TodoFindComponent {
  @Input()
  public todoCollection: ITodo[]
  private resultCollection: ITodo[] = []
  @Output()
  public onResult: EventEmitter<any> = new EventEmitter<any>()

  public onWrite(data: string, category: string) {
    for (let i = 0; i < this.todoCollection.length; i++) {
      const todoInstance: string = category === 'Title' ? this.todoCollection[i].title : this.todoCollection[i].description
      if (this.contains(todoInstance, data)) {
        this.resultCollection.push(this.todoCollection[i])
      }
    }
    // this.onResult(this.resultCollection)
    this.onResult.emit(this.resultCollection)
    this.resultCollection = []
  }

  private contains(data: string, findData: string): boolean {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === findData[0] && (i + findData.length - 1) < data.length) {
        var isEquals: boolean = true
        for (let j = 1; j < findData.length; j++) {
          if (data[i + j] !== findData[j]) {
            isEquals = false
            break
          }
        }
        if (isEquals)
          return true
      }
    }
    return false
  }
}
