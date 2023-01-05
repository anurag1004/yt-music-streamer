import { Component } from '@angular/core';
import { PlaylistStorageService } from './service/playlist.storage.service';
import { PlaylistItem } from 'src/shared/playlistItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yt-streamer';
}
