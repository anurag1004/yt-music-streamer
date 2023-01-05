import { Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { PlaylistItem } from 'src/shared/playlistItem.model';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent{
  musicIcon = faMusic;
  @Input() playlistItem:PlaylistItem = new PlaylistItem('', '', '', '', '', '');
}
