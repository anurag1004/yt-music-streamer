import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from '../service/player.service';
import * as moment from 'moment';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import { PlaylistStorageService } from '../service/playlist.storage.service';
import { Playlist } from 'src/shared/playlist.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-playlist-fetch-bar',
  templateUrl: './playlist-fetch-bar.component.html',
  styleUrls: ['./playlist-fetch-bar.component.css'],
})
export class PlaylistFetchBarComponent implements OnInit{
  playlistUrl: string = '';
  foundPlaylists: Playlist[] = [];
  newPlaylistName: string = '';
  /* configure icons */
  refreshIcon = faArrowsRotate;
  /* end */
  private baseUrl: string = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private playerServ: PlayerService,
    private playlistStorageServ: PlaylistStorageService,
    private modalService: NgbModal
  ) {
    this.playlistStorageServ.playlistChanged.subscribe((playlists: Playlist[]) => {
      this.foundPlaylists = playlists;
    })
  }
  ngOnInit(): void {
    // fetch all playlist from localstorage
    (async () => {
      for (let i = 0; i < localStorage.length; i++) {
        const playlistName = localStorage.key(i);
        if (playlistName) {
          console.log('playlist found in local storage ' + playlistName);
          let cachedObj = JSON.parse(localStorage.getItem(playlistName) || '{}');
          const playlistId = cachedObj.playlistId;
          // check if playlist is older than 1week day
          if (
            moment(cachedObj.fetchedAt).isBefore(moment().subtract(1, 'week'))
          ) {
            console.log(
              `playlist ${playlistName}-${playlistId} is older than 1 week.. Deleting from local storage`
            );
            localStorage.removeItem(playlistName);
            const songs = await this.playlistStorageServ.getPlaylistSongs(playlistId);
            console.log('playlist refreshed in the background ' + playlistId);
            const refreshedPlaylist: Playlist = {
              id: playlistId,
              name: playlistName,
              songs: songs,
            };
            // store new playlist to local storage
            this.playlistStorageServ.addPlaylistToLocalStorage(refreshedPlaylist);
            // update playlist map
            this.playlistStorageServ.updatePlaylistMap(refreshedPlaylist);
          } else {
            this.playlistStorageServ.updatePlaylistMap({
              id: playlistId,
              name: playlistName,
              songs: cachedObj.items,
            });
          }
        }
      }
    })();
  }
  private getplaylistId(url: string): string {
    return url.length > 0 ? url.split('list=')[1] : '';
  }
  loadSelectedPlaylist(pl:Playlist) {
    this.playerServ.addPlaylistItems(pl.songs);
  }
  fetchPlaylist(event: Event, popupContent: any) {
    event.preventDefault();
    if (!this.playlistUrl.length) return;
    console.log(this.playlistUrl);
    // get playlist id from url
    let playlistId: string = this.getplaylistId(this.playlistUrl);
    // check if playlist is already in local storage
    if (this.playlistStorageServ.isPlaylistExist(playlistId)) {
      // playlist found in cache
      const songs: PlaylistItem[] =
        this.playlistStorageServ.getPlaylist(playlistId).songs;
      // add playlist to player
      this.playerServ.addPlaylistItems(songs);
      return;
    }
    // fetch when not in local storage
    this.getNewPlaylist(this.playlistUrl , popupContent);
  }
  getNewPlaylist(playlistUrl:string, popupContent: any) {
    if(!playlistUrl.length) return;
    let playlistId: string = this.getplaylistId(playlistUrl);
    this.modalService.open(popupContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
    this.refreshCurrentPlaylist({
      id: playlistId,
      name: this.newPlaylistName,
      songs: []
    })
  }
  async refreshCurrentPlaylist(pl:Playlist) {
    if(!pl) return;
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
    this.playlistStorageServ.updatePlaylistMap(updatedPlaylist)
    this.playlistStorageServ.addPlaylistToLocalStorage(updatedPlaylist);
    this.loadSelectedPlaylist(updatedPlaylist);
  }
}
