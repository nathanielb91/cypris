import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  searchForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }
  
  // Form submit handler
  submitSearch() {
    const query = this.searchForm.get('query')?.value;
    if (query && query.trim()) {
      this.search.emit(query);
    }
  }
  
  // Reset search and results
  clearSearch() {
    this.searchForm.get('query')?.setValue('');
    this.clear.emit();
  }
}