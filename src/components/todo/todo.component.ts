import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html'
})
export class TodoComponent{
  @Input()
  public title: string
  @Input()
  public description: string
  @Input()
  public isSelected: boolean
}
