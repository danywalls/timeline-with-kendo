import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private githubRepo = 'https://api.github.com/repos';
  private http = inject(HttpClient);
  getCommits(user: string, repo: string): Observable<any> {
    return this.http.get(`${this.githubRepo}/${user}/${repo}/commits`).pipe(
      map((response: any) => {
        return response.map((commit: any) => ({
            title: commit.commit.message,
            subtitle: commit.commit.author.date,
            description: commit.commit.author.name,
            date: new Date(commit.commit.author.date),
          }
        ));
      })
    );
  }
}
