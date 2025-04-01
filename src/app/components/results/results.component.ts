import { Component, Input } from '@angular/core';
import { Paper } from '../../services/core-api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input() papers: Paper[] = [];
  @Input() loading = false;
  
  getAuthorsList(authors: { name: string }[]): string {
    if (!authors || authors.length === 0) {
      return 'Unknown';
    }
    
    return authors.map(author => author.name).join(', ');
  }
  
  getDownloadUrl(paper: Paper): string {
    // Check for download link in links array
    // If link allows download, open downloadable source
    const downloadLink = paper.links?.find(link => link.type === 'download' || link.type === 'reader');
    if (downloadLink) {
      return downloadLink.url;
    }
    
    if (paper.sourceFulltextUrls && paper.sourceFulltextUrls.length > 0) {
      return paper.sourceFulltextUrls[0];
    }
    
    return '';
  }

  // Check if paper has a downloadable PDF link
  hasDownloadLink(paper: Paper): boolean {
    if (!paper.links) {
      return false;
    }
    
    return paper.links.some(link => {
      if (link.url) {
        return link.url.toLowerCase().endsWith('.pdf');
      }
      return false;
    });
  }
  
  // Open in new tab
  openPaper(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}