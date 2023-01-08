import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { faIcons, faMusic, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlaylistStorageService } from 'src/app/service/playlist.storage.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent{
  @Input() playlistItem:PlaylistItem = new PlaylistItem('', '', '', '', '', '');
  @Input() index:number = -1;
  /*
    configure icons
  */
  musicIcon = faMusic;
  constructor(private plStorageServ: PlaylistStorageService) {
  }
  
  playTrack():void {
    this.plStorageServ.playTrack(this.playlistItem, this.index);
  }
}
