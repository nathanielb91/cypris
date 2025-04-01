import { Component } from '@angular/core';
import { CoreApiService, Paper } from './services/core-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  papers: Paper[] = [];
  loading = false;
  totalHits = 0;
  currentQuery = '';
  resultsPerPage = 25; // Default num of results
  currentPage = 1;
  errorMessage = '';
  
  constructor(private coreApiService: CoreApiService) {}
  
  onSearch(query: string) {
    if (!query || !query.trim()) return;
    
    this.currentQuery = query;
    this.currentPage = 1; // Reset to first page on new search
    this.errorMessage = ''; // Clear any previous errors
    this.loadResults();
  }
  
  loadResults() {
    if (!this.currentQuery) return;
    
    this.loading = true;
    this.errorMessage = ''; // Clear any previous errors
    const offset = (this.currentPage - 1) * this.resultsPerPage;
    
    
    this.coreApiService.searchPapers({
      query: this.currentQuery,
      limit: this.resultsPerPage,
      offset: offset
    }).subscribe({
      next: (response) => {
        this.papers = response.results;
        this.totalHits = response.totalHits;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.papers = [];
        this.errorMessage = error.userMessage || 'Error searching papers';
        console.error('Error searching papers:', error);
      }
    });
  }
  
  onClearSearch() {
    this.papers = [];
    this.totalHits = 0;
    this.currentQuery = '';
    this.currentPage = 1;
    this.errorMessage = '';
  }
  
  onCountChange(count: number) {
    
    if (count === this.resultsPerPage) {
      return; // No change
    }
    
    // Always reset to page 1 when changing count to avoid api call issues
    const oldPage = this.currentPage;
    this.currentPage = 1;
    
    this.resultsPerPage = count;
    this.errorMessage = ''; // Clear previous errors
    
    if (this.currentQuery) {
      this.loadResults();
    }
  }
  
  onPageChange(page: number) {
    
    if (page === this.currentPage) {
      return; // No change
    }
    
    this.currentPage = page;
    this.errorMessage = ''; // Clear errors
    this.loadResults();
    
    // Scroll back to the top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}