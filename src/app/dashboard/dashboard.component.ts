import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Task } from '../model/task';
import { HttpClientModule } from '@angular/common/http';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,FormsModule,NgFor,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[CrudService]
})
export class DashboardComponent implements OnInit {
  taskobj:Task = new Task();
  taskarr:Task[]=[];

  addTaskValue:string='';
 constructor (private crudService:CrudService){ }
 ngOnInit(): void {
   this.taskobj=new Task();
this.taskarr=[];
  this.getAlltask();
 }
 getAlltask(){
  this.crudService.getallTask().subscribe(res=>{
this.taskarr=res
  },err=>{
alert('unable to get list of task')
  })
 }
 addTask(arg:any){
  this.taskobj.task_name=this.addTaskValue;
  this.crudService.addTask(this.taskobj).subscribe(res=>{
this.ngOnInit();
this.addTaskValue='';
  },err=>{
    alert(err);
  })
 }

 editTask(task: Task) {
  this.crudService.editTask(task).subscribe(
    (res) => {
      this.ngOnInit();
    },
    (err) => {
      alert('Failed to update');
    }
  );
}
 deleteTask(etsak:Task){
  this.crudService.deleteTask(etsak).subscribe(res=>{
    this.ngOnInit();
  },err=>{
    alert('Feild to delete task')
  })
 }
}
