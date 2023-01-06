import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { PlaylistStorageService } from '../service/playlist.storage.service';
import { PlaylistItem } from 'src/shared/playlistItem.model';

@Component({
  selector: 'app-playlist-fetch-bar',
  templateUrl: './playlist-fetch-bar.component.html',
  styleUrls: ['./playlist-fetch-bar.component.css'],
})
export class PlaylistFetchBarComponent {
  playlistUrl: string = '';
  private baseUrl: string = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private plStorageServ: PlaylistStorageService
  ) {}
  private getplaylistId(url: string): string {
    return url.length>0? url.split('list=')[1]:'';
  }
  fetchPlaylist(event: Event) {
    event.preventDefault();
    if (!this.playlistUrl.length) return;
    console.log(this.playlistUrl);
    // get playlist id from url
    let playlistId: string = this.getplaylistId(this.playlistUrl);
    // check local storage for playlist
    if (localStorage.getItem(playlistId)) {
      let cachedObj = JSON.parse(localStorage.getItem(playlistId) || '{}');
      // check if playlist is older than 1week day
      if (moment(cachedObj.fetchedAt).isBefore(moment().subtract(1, 'week'))) {
        console.log(
          'playlist is older than 1 week.. Deleting from local storage'
        );
        localStorage.removeItem(playlistId);
        this.fetchPlaylist(event);
        return;
      }
      this.plStorageServ.addPlaylistItems(cachedObj.items);
      return;
    }
    // fetch when not in local storage
    this.refreshPlaylist(event);
  }
  refreshPlaylist(event: Event) {
    const playlistId: string = this.getplaylistId(this.playlistUrl);
    if (!playlistId.length) return;
    // fetch when not in local storage
    this.httpClient.get(`${this.baseUrl}/playlist/${playlistId}`).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem(
          playlistId,
          JSON.stringify({
            fetchedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            items: data,
          })
        );
        this.plStorageServ.addPlaylistItems(data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
