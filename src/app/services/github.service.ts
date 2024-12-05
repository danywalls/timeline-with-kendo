import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, map, Observable} from 'rxjs';
import {TimelineEvent} from "@progress/kendo-angular-layout";


@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private githubRepo = 'https://api.github.com/repos';
  private http = inject(HttpClient);
  getCommits(user: string, repo: string): Observable<TimelineEvent[]> {
    return this.http.get(`${this.githubRepo}/${user}/${repo}/commits`).pipe(
      catchError(() =>  EMPTY),
      map((response: any) => {
        return response.map((commit: any) => ({
            title: commit.commit.message,
            subtitle: commit.commit.author.date,
            description: commit.commit.author.name,
            date: new Date(commit.commit.author.date)
          }
        ));
      })
    );
  }
}
