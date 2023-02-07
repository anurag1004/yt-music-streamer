import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  faMusic,
  faPlay,
  faPause,
  faForwardFast,
  faBackwardFast,
  faShuffle,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/service/player.service';
import { PlaylistItem } from 'src/shared/playlistItem.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  playlistItem: PlaylistItem = new PlaylistItem('', '', '', '', '', '');
  songIndex = -1;
  thumbnailUrl = 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  /* configure icons */
  musicIcon = faMusic;
  playIcon = faPlay;
  pauseIcon = faPause;
  previosIcon = faBackwardFast;
  nextIcon = faForwardFast;
  repeatIcon = faRepeat;
  shuffleIcon = faShuffle;
  playerIcon = this.playIcon;
  /* END */

  audio: HTMLAudioElement = new Audio();
  maxDuration = 0;
  playbackPosition = 0;
  isShuffle = false;
  isRepeat = false;
  private previewUrl: string = '';

  constructor(private playerServ: PlayerService) {
    this.playerServ.currentSongChanged.subscribe(
      (currentSong: { track: PlaylistItem; index: number }) => {
        const { track, index } = currentSong;
        // stop current song if playing
        this.audio.pause();
        this.setDefaultAudioConfig();
        // set new song
        this.playlistItem = track;
        this.previewUrl = `http://localhost:3000/playsong/${track.id}`;
        this.songIndex = index;
        console.log(`new song: ${this.playlistItem.title} (${this.songIndex})`);
        // play new song
        this.playerHandler();
        // get the thumbnail url
        this.playerServ.getSongThumbnailUrl(this.playlistItem.id).subscribe((data:any)=>{
          this.thumbnailUrl = data.thumbnail;
        },(err:any)=>{
          console.log(err)
        })
      }
    );
  }
  seek(event: Event): void {
    this.audio.currentTime = <number>(
      (<unknown>(<HTMLInputElement>event.target).value)
    );
  }
  playerHandler(): void {
    // check if playlistitem is empty
    if (this.playlistItem.id.length === 0) {
      console.log('no song selected');
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
    this.audio.play();
    // temporary volume
    this.audio.volume = 0.1;
    this.playerIcon = this.pauseIcon;
  }
  changeSong(direction: string): void {
    console.log(`change song: ${direction}`);
    // check if playlistitem is empty
    if (this.playlistItem.id.length === 0) {
      console.log('no song selected');
      return;
    }
    // change track
    if (direction === 'next') {
      this.playerServ.getTrackByIndex(this.songIndex + 1, this.isShuffle);
    } else {
      this.playerServ.getTrackByIndex(this.songIndex - 1, this.isShuffle);
    }
  }
  shuffleToggle(): void {
    this.isShuffle = !this.isShuffle;
    console.log(`shuffle: ${this.isShuffle}`);
  }
  repeatCurrentSongToggle(): void {
    console.log(`repeat: ${this.isRepeat}`);
    if (this.isRepeat) {
      this.audio.onended = () => {
        this.changeSong('next');
      };
      this.isRepeat = false;
      return;
    }
    this.audio.onended = () => {
      // repeat current song when song ends
      this.audio.play();
    };
    this.isRepeat = true;
  }
  setDefaultAudioConfig(): void {
    // reset audio object
    this.audio = new Audio();
    // reset player icon
    this.playerIcon = this.playIcon;
    // reset playback position
    this.playbackPosition = 0;
    // reset max duration
    this.maxDuration = 0;
    // autoplay next song when song ends
    this.audio.onended = () => {
      this.changeSong('next');
    };
    this.audio.onloadedmetadata = () => {
      // update max duration
      this.maxDuration = this.audio.duration;
    };
    this.audio.ontimeupdate = () => {
      // update playback position
      this.playbackPosition = this.audio.currentTime;
    };
  }
}
