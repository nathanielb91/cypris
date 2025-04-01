import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 25;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  
  totalPages = 0;
  pages: number[] = [];
  
  ngOnChanges(changes: SimpleChanges) {
    this.calculatePages();
  }
  
  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Generate page numbers array for display
    this.pages = [];
    
    // Show max 5 page numbers centered around current page
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPages && startPage > 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
}