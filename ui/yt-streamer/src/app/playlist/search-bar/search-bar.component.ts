import { Component } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query:string = ''
  constructor(private playerServ: PlayerService) {}
  filterPlaylist(event:Event):void {
    this.playerServ.filterPlaylistItems(this.query);
  }
}
