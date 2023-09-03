import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();

  }

  ngOnInit(): void {
  }

  public setEmitTaskList(event: string){
  this.taskList.push({task: event, checked: false});
  }

  public deleteItemTaskList(index: number){
    this.taskList.splice(index, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Deseja realmente deletar tudo?");

    if(confirm)
      this.taskList = [];
  }

  public validateInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Deseja realmente deletar esta tarefa?");
      if(confirm)
        this.deleteItemTaskList(index);
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
