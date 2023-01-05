import { Component } from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { PlaylistStorageService } from '../service/playlist.storage.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  playlist:PlaylistItem[] = [];
  constructor(private plStorageServ:PlaylistStorageService){
    this.plStorageServ.playListChanged.subscribe((playlist:PlaylistItem[]) => {
      this.playlist = playlist;
    });
    // temporary
    this.playlist = this.plStorageServ.getPlaylist();
  }
}
