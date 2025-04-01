import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Paper {
  id: number;
  title: string;
  authors: { name: string }[];
  abstract?: string;
  yearPublished?: number;
  publisher?: string;
  fullText?: boolean;
  downloadUrl?: string;
  links?: Array<{type: string, url: string}>;
  sourceFulltextUrls?: string[];
}

export interface SearchParams {
  query: string;
  limit: number;
  offset: number;
}

export interface ApiResponse {
  totalHits: number;
  results: Paper[];
}

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {
  private apiUrl = 'https://api.core.ac.uk/v3/search/works';
  private apiKey = environment.coreApiKey;
  
  constructor(private http: HttpClient) {}

  searchPapers(params: SearchParams): Observable<ApiResponse> {
    let httpParams = new HttpParams()
      .set('q', params.query)
      .set('limit', params.limit.toString())
      .set('offset', params.offset.toString());
    
    return this.http.get<any>(this.apiUrl, { 
      params: httpParams,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    }).pipe(
      map(response => {
        // Process results to match Paper interface
        const processedResults = (response.results || []).map((paper: any) => {
          // Find download URL if available
          const downloadLink = paper.links?.find((link: any) => link.type === 'download');
          const downloadUrl = downloadLink ? downloadLink.url : undefined;
          
          // Check if it has full text
          const fullText = paper.sourceFulltextUrls && paper.sourceFulltextUrls.length > 0;
          
          return {
            ...paper,
            fullText,
            downloadUrl
          };
        });
        
        return {
          // Added the " || 0 " after API started returning nulls
          totalHits: response.totalHits || 0,
          results: processedResults
        };
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Error loading results';
        
        // Check for common API errors
        if (error.status === 429) {
          errorMsg = 'Too many requests - try again in a bit';
        } else if (error.status === 403) {
          errorMsg = 'API access issue - might be rate limited';
        }
        
        console.error('API Error:', error);
        
        return throwError(() => ({ 
          error,
          userMessage: errorMsg 
        }));
      })
    );
  }
}