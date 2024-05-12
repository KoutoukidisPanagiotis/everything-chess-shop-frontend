import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchControl: FormControl = new FormControl();

  constructor(private router: Router) { }

  onSearch(event: Event): void{
    event.preventDefault();
    const keyword: string = this.searchControl.value;
    this.router.navigateByUrl(`/search/${keyword}`);
  }
}
