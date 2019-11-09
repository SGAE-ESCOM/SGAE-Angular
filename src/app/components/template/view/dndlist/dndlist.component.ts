import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from '@app/components/shared/breadcrumb/breadcrumb.component';
import { ListLinks } from '@app/components/shared/breadcrumb/ListLinks';

@Component({
  selector: 'app-dndlist',
  templateUrl: './dndlist.component.html',
  styleUrls: ['./dndlist.component.scss']
})
export class DNDListComponent {

  constructor(){
    BreadcrumbComponent.update( ListLinks.DRAG_AND_DROP, [ListLinks.HOME]);
  }

  hello = "";

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(this.movies);
    this.movies = this.movies;
    this.hello += "-";
  }

}
