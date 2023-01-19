import { PlaylistItem } from "./playlistItem.model";

export class Playlist{
    constructor(
        public id:string,
        public name:string,
        public songs:PlaylistItem[]
    ){}
}