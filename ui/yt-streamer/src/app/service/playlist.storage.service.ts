import { EventEmitter, Injectable } from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
@Injectable({
  providedIn: 'root',
})
export class PlaylistStorageService {
  private playlist: PlaylistItem[] = [
    {
      id: 'hktr9_sRIS0',
      original_title: "IT'S THE RIGHT TIME",
      title: "IT'S THE RIGHT TIME",
      artist: 'unknown',
      duration: '221',
      publishedAt: '2018-07-09T01:50:41.000Z',
    },
    {
      id: 'hktr9_sRIS0',
      original_title: "IT'S THE RIGHT TIME",
      title: "IT'S THE RIGHT TIME",
      artist: 'unknown',
      duration: '221',
      publishedAt: '2018-07-09T01:50:41.000Z',
    },
    {
      id: 'hktr9_sRIS0',
      original_title: "IT'S THE RIGHT TIME",
      title: "IT'S THE RIGHT TIME",
      artist: 'unknown',
      duration: '221',
      publishedAt: '2018-07-09T01:50:41.000Z',
    },
    {
      id: 'hktr9_sRIS0',
      original_title: "IT'S THE RIGHT TIME",
      title: "IT'S THE RIGHT TIME",
      artist: 'unknown',
      duration: '221',
      publishedAt: '2018-07-09T01:50:41.000Z',
    },
  ];
  public playListChanged = new EventEmitter<PlaylistItem[]>();
  public currentSongChanged = new EventEmitter<{track:PlaylistItem, index:number}>();
  constructor() {}
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
  getTrackByIndex(index: number):void {
    index = index < 0 ? this.playlist.length-1:(index > this.playlist.length-1 ? 0 : index);
    this.currentSongChanged.emit({track: this.playlist[index], index});
  }
}
