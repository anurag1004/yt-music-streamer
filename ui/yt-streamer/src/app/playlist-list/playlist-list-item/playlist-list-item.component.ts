import { Component, Input } from '@angular/core';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/service/player.service';
import { PlaylistStorageService } from 'src/app/service/playlist.storage.service';
import { Playlist } from 'src/shared/playlist.model';

@Component({
  selector: 'app-playlist-list-item',
  templateUrl: './playlist-list-item.component.html',
  styleUrls: ['./playlist-list-item.component.css']
})
export class PlaylistListItemComponent {
  @Input() playlist:Playlist = new Playlist("", "", []);
  isRefreshing:boolean = false;
  /* configure icons */
  refreshIcon = faArrowsRotate;
  /* END */
  constructor(private playlistStorageServ: PlaylistStorageService, private playerServ:PlayerService) {}

  loadSelectedPlaylist(pl:Playlist) {
    this.playerServ.addPlaylistItems(pl.songs);
  }
  async refreshCurrentPlaylist(pl:Playlist) {
    if(!pl) return;
    this.isRefreshing = true;
    const songs = await this.playlistStorageServ.getPlaylistSongs(pl.id);
    if(!songs || !songs.length){
      console.log('playlist not found');
      return;
    }
    const updatedPlaylist: Playlist = {
      id: pl.id,
      name: pl.name,
      songs: songs,
    }
    console.log('playlist refreshed in the background ' + pl.id);
    this.isRefreshing = false;
    this.playlistStorageServ.updatePlaylistMap(updatedPlaylist)
    this.playlistStorageServ.addPlaylistToLocalStorage(updatedPlaylist);
    this.loadSelectedPlaylist(updatedPlaylist);
  }
}
