import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GithubService} from './services/github.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  githubService = inject(GithubService);
  public commits$ = toSignal(this.githubService.getCommits('alyssamichelle', 'tour-of-ponies'));

}
