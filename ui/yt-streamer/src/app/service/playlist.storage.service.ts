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
    }
    addPlaylist(playlist: Playlist) {
        this.playlists.set(playlist.id, playlist);
        this.addPlaylistToLocalStorage(playlist);
        this.playerServ.addPlaylistItems(playlist.songs);
    }
    addPlaylistToLocalStorage(playlist:Playlist) {
        // remove if playlist already exist
        localStorage.removeItem(playlist.name);
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
    getPlaylistSongs(playlistId: string):Promise<any> {
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