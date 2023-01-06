import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnChanges{
  musicIcon = faMusic;
  @Input() playlistItem:PlaylistItem = new PlaylistItem('', '', '', '', '', '');
  previewUrl:string = '';
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playlistItem']) {
      console.log('playlistItem changed: ', this.playlistItem)
      this.previewUrl = `http://localhost:3000/playsong/${this.playlistItem.id}`;
    }
  }
  seekSong():void {
    console.log('seekSong');
  }
}
