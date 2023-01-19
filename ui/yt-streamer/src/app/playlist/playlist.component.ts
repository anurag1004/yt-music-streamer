import { Component } from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  playlist:PlaylistItem[] = [];
  constructor(private playerServ:PlayerService){
    this.playerServ.playListChanged.subscribe((playlist:PlaylistItem[]) => {
      this.playlist = playlist;
    });
    // temporary
    this.playlist = this.playerServ.getPlaylist();
  }
}
