import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { faIcons, faMusic, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnChanges{
  @Input() playlistItem:PlaylistItem = new PlaylistItem('', '', '', '', '', '');

  /*
    configure icons
  */
  musicIcon = faMusic;
  playIcon = faPlay;
  pauseIcon = faPause
  playerIcon = this.playIcon;

  audio = new Audio();
  maxDuration = 0;
  playbackPosition = 0;
  private previewUrl:string = '';
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playlistItem']) {
      this.previewUrl = `http://localhost:3000/playsong/${this.playlistItem.id}`;
    }
  }
  seek(event:Event):void {
    this.audio.currentTime = <number><unknown>(<HTMLInputElement>event.target).value;
  }
  playerHandler():void {
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
    this.audio.src = this.previewUrl;
    this.audio.load();
    // get max duration using typescript
    this.audio.onloadedmetadata = () => {
      this.maxDuration = this.audio.duration;
    }
    this.audio.ontimeupdate = () => {
      this.playbackPosition = this.audio.currentTime;
    }
    this.audio.play();
    this.playerIcon = this.pauseIcon;
  }
}
