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
  playlist:PlaylistItem[] = [];
  constructor(private plStorageServ:PlaylistStorageService){
    this.plStorageServ.playListChanged.subscribe((playlist:PlaylistItem[]) => {
      this.playlist = playlist;
    });
    // temporary
    this.playlist = this.plStorageServ.getPlaylist();
  }
}
