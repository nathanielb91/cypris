import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-count-selector',
  templateUrl: './count-selector.component.html',
  styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent implements OnInit, OnChanges {
  @Input() selectedCount = 25;
  @Output() countChange = new EventEmitter<number>();
  
  // Options for 'results per page'
  counts = [10, 25, 50, 100];
  
  ngOnInit() {
    // Make sure selected count is valid (fallback to 25)
    if (!this.counts.includes(this.selectedCount)) {
      this.selectedCount = 25;
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCount']) {
      // Check if new value is valid
      if (!this.counts.includes(this.selectedCount)) {
        this.selectedCount = 25;
      }
    }
  }
  
  changeCount(count: number) {
    if (count === this.selectedCount) return; // No change
    
    this.selectedCount = count;
    this.countChange.emit(count);
  }
}