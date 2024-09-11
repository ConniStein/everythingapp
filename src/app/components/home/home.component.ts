import { Component, OnInit } from '@angular/core';
import { DirectoryService } from 'src/app/services/directory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  users : any[] = [];

  constructor(private directoryService: DirectoryService){}

  ngOnInit():void{
    this.directoryService.getUsers().subscribe((data) =>{
      this.users = data;
    });
  }

}
