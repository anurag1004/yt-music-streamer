import { Component } from '@angular/core';
import { PlaylistStorageService } from 'src/app/service/playlist.storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query:string = ''
  constructor(private plStorageServ: PlaylistStorageService) {}
  filterPlaylist(event:Event):void {
    this.plStorageServ.filterPlaylistItems(this.query);
  }
}
