import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Playlist } from "src/shared/playlist.model";
import { PlayerService } from "./player.service";
import * as moment from 'moment';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: "root"
})
export class PlaylistStorageService{
    // playlist map
    private playlists: Map<string, Playlist> = new Map();
    baseUrl: string = 'http://localhost:3000';
    public playlistChanged = new EventEmitter<Playlist[]>();
    constructor(private playerServ:PlayerService, private httpClient:HttpClient) {
        // // fetch all playlist from localstorage
        // (async() => {
        //     for (let i = 0; i < localStorage.length; i++) {
        //         let key = localStorage.key(i);
        //         if (key) {
        //             console.log('playlist found in local storage'+key)
        //             let cachedObj = JSON.parse(localStorage.getItem(key) || '{}');
        //             // check if playlist is older than 1week day
        //             if (moment(cachedObj.fetchedAt).isBefore(moment().subtract(1, 'week'))) {
        //                 console.log(
        //                     `playlist ${key} is older than 1 week.. Deleting from local storage`
        //                 );
        //                 localStorage.removeItem(key);
        //                 const songs = await this.refreshPlaylist(key);
        //                 console.log('playlist refreshed in the background '+key)
        //                 const refreshedPlaylist:Playlist = {
        //                     id: <string>key,
        //                     name: 'playlist-'+key,
        //                     songs: songs
        //                 }
        //                 // store new playlist to local storage
        //                 this.addPlaylistToLocalStorage(refreshedPlaylist);
        //                 // update playlist map
        //                 this.updatePlaylistMap(refreshedPlaylist);
        //             }else{
        //                 this.updatePlaylistMap({
        //                     id: key,
        //                     name: 'playlist-'+key,
        //                     songs: cachedObj.items
        //                 })
        //             }
        //         }
        //     }
        // })()
    }
    addPlaylist(playlist: Playlist) {
        this.playlists.set(playlist.id, playlist);
        this.addPlaylistToLocalStorage(playlist);
        this.playerServ.addPlaylistItems(playlist.songs);
    }
    addPlaylistToLocalStorage(playlist:Playlist) {
        // store item in localhost
        localStorage.setItem(
            playlist.name,
            JSON.stringify({
                playlistId: playlist.id,
                fetchedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                items: playlist.songs,
            })
        );
    }
    updatePlaylistMap(playlist: Playlist) {
        this.playlists.set(playlist.id, playlist);
        this.playlistChanged.emit(Array.from(this.playlists.values()));
    }
    isPlaylistExist(playlistId: string): boolean {
        return this.playlists.has(playlistId);
    }
    getPlaylist(playlistId: string): Playlist {
        return this.playlists.get(playlistId) || {id: '', name: '', songs: []};
    }
    refreshPlaylist(playlistId: string):Promise<any> {
        return new Promise((res, rej) => {
            console.log('refreshing playlist'+playlistId)
            this.httpClient.get(`${this.baseUrl}/playlist/${playlistId}`).subscribe(
                (data: any) => {
                    console.log(data);
                    res(data);
                },
                (err: any) => {
                    console.log(err);
                    rej(err);
                }
            );
        })
    }
    getAllPlaylists(): Map<string, Playlist> {
        return this.playlists;
    }
}