import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yt-streamer';
  playlistUrl: string = '';
  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.playlistUrl = params['playlistUrl'];
      console.log(this.playlistUrl)
    });
  }
}
