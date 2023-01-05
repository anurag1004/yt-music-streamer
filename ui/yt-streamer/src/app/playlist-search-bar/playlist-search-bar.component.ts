import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaylistStorageService } from '../service/playlist.storage.service';
@Component({
  selector: 'app-playlist-search-bar',
  templateUrl: './playlist-search-bar.component.html',
  styleUrls: ['./playlist-search-bar.component.css']
})
export class PlaylistSearchBarComponent {
    playlistUrl:string = '';
    private baseUrl:string = 'http://localhost:3000';
    constructor(private httpClient:HttpClient, private plStorageServ:PlaylistStorageService) { }
    fetchPlaylist(event:Event) {
        event.preventDefault();
        if(!this.playlistUrl.length)
            return;
        console.log(this.playlistUrl);
        // get playlist id from url
        let playlistId:string = this.playlistUrl.split('list=')[1];

        this.httpClient.get(`${this.baseUrl}/playlist/${playlistId}`).subscribe((data:any) => {
            console.log(data);
            this.plStorageServ.addPlaylistItems(data);
        }, (err:any) => {
            console.log(err);
        });
    }
}
