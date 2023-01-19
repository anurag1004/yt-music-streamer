import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { faIcons, faMusic, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/service/player.service';

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
  constructor(private playerServ: PlayerService) {
  }
  
  playTrack():void {
    this.playerServ.playTrack(this.playlistItem, this.index);
  }
}
