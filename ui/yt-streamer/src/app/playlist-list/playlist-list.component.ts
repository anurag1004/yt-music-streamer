import { Component, Input } from '@angular/core';
import { Playlist } from 'src/shared/playlist.model';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent {
  @Input() foundPlaylists:Playlist[] = [];
}
