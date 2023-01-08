import { Component } from '@angular/core';
import { faMusic, faPlay, faPause, faForwardFast, faBackwardFast } from '@fortawesome/free-solid-svg-icons';
import { PlaylistStorageService } from 'src/app/service/playlist.storage.service';
import { PlaylistItem } from 'src/shared/playlistItem.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  playlistItem:PlaylistItem = new PlaylistItem('', '', '', '', '', '');
  songIndex = -1;
  /* configure icons */
  musicIcon = faMusic;
  playIcon = faPlay;
  pauseIcon = faPause
  previosIcon = faBackwardFast;
  nextIcon = faForwardFast;
  playerIcon = this.playIcon;
  /* END */

  audio:HTMLAudioElement = new Audio();
  maxDuration = 0;
  playbackPosition = 0;
  private previewUrl:string = '';

  constructor(private plStorageServ: PlaylistStorageService) {
    this.plStorageServ.currentSongChanged.subscribe((currentSong:{track:PlaylistItem, index:number}) => {
      const {track, index} = currentSong;
      // stop current song if playing
      this.audio.pause();
      this.setDefaultAudioConfig();
      // set new song
      this.playlistItem = track;
      this.previewUrl = `http://localhost:3000/playsong/${track.id}`;
      this.songIndex = index;
      console.log(`new song: ${this.playlistItem.title} (${this.songIndex})`)
      // play new song
      this.playerHandler()
    })
  }
  seek(event:Event):void {
    this.audio.currentTime = <number><unknown>(<HTMLInputElement>event.target).value;
  }
  playerHandler():void {
    // check if playlistitem is empty
    if (this.playlistItem.id.length === 0) {
      console.log('no song selected')
      return;
    }
     // check if audio is playing
     if (!this.audio.paused) {
      // since audio is playing, pause it
      this.audio.pause();
      this.playerIcon = this.playIcon;
      return;
    }
    // check if audio is paused and has a src
    if (this.audio.paused && this.audio.src.length) {
      // since audio is paused, play it
      this.audio.play();
      this.playerIcon = this.pauseIcon;
      return;
    }
    // else play new song
    this.audio.src = this.previewUrl;
    this.audio.load(); // load audio
    this.audio.onloadedmetadata = () => {
      // update max duration
      this.maxDuration = this.audio.duration;
    }
    this.audio.ontimeupdate = () => {
      // update playback position
      this.playbackPosition = this.audio.currentTime;
    }
    this.audio.play();
    // temporary volume
    this.audio.volume = 0.1;
    this.playerIcon = this.pauseIcon;
  }
  changeSong(direction:string):void {
    console.log(`change song: ${direction}`)
    // check if playlistitem is empty
    if (this.playlistItem.id.length === 0) {
      console.log('no song selected')
      return;
    }
    // change track
    if(direction === 'next') {
      this.plStorageServ.getTrackByIndex(this.songIndex + 1);
    } else {
      this.plStorageServ.getTrackByIndex(this.songIndex - 1);
    }
  }
  setDefaultAudioConfig():void {
    // reset audio object
    this.audio = new Audio();
    // reset player icon
    this.playerIcon = this.playIcon;
    // reset playback position
    this.playbackPosition = 0;
    // reset max duration
    this.maxDuration = 0;
  }
}
