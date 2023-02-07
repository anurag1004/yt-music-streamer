import { EventEmitter, Injectable } from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playlist: PlaylistItem[] = [];
  private shuffledPlaylist: PlaylistItem[] = [];
  public playListChanged = new EventEmitter<PlaylistItem[]>();
  public currentSongChanged = new EventEmitter<{track:PlaylistItem, index:number}>();
  constructor(private httpClient: HttpClient) {}
  addPlaylistItems(items: any[]) {
    this.playlist = items.map((item: any) => {
      return new PlaylistItem(
        item.artist,
        item.duration,
        item.id,
        item.original_title,
        item.publishedAt,
        item.title
      );
    });
    this.shuffledPlaylist = _.shuffle(this.playlist);
    this.playListChanged.emit(this.playlist.slice());
  }
  getPlaylist() {
    return this.playlist.slice();
  }
  filterPlaylistItems(query: string) {
    const filteredPlaylist = this.playlist.filter((item) => {
      // starts with or contains query word in title or by artist
      return (
        item.original_title.toLowerCase().startsWith(query.toLowerCase()) ||
        item.original_title.toLowerCase().includes(query.toLowerCase()) ||
        item.artist.toLowerCase().startsWith(query.toLowerCase()) ||
        item.artist.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.playListChanged.emit(filteredPlaylist);
  }
  playTrack(track: PlaylistItem, index: number):void {
    this.currentSongChanged.emit({track: track, index: this.playlist.indexOf(track)});
  }
  getTrackByIndex(index: number, isShuffle:boolean):void {
    index = index < 0 ? this.playlist.length-1:(index > this.playlist.length-1 ? 0 : index);
    if(isShuffle) {
      this.currentSongChanged.emit({track: this.shuffledPlaylist[index], index});
      return;
    }
    this.currentSongChanged.emit({track: this.playlist[index], index});
  }
  getSongThumbnailUrl(id: string) {
    return this.httpClient.get('http://localhost:3000/info/' + id)
  }
}
