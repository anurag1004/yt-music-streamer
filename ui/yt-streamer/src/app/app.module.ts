import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PlaylistItemComponent } from './playlist/playlist-item/playlist-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistFetchBarComponent } from './playlist-fetch-bar/playlist-fetch-bar.component';
import { SearchBarComponent } from './playlist/search-bar/search-bar.component';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { PlayerComponent } from './playlist/player/player.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistListItemComponent } from './playlist-list/playlist-list-item/playlist-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistItemComponent,
    PlaylistComponent,
    PlaylistFetchBarComponent,
    SearchBarComponent,
    MinuteSecondsPipe,
    PlayerComponent,
    PlaylistListComponent,
    PlaylistListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
