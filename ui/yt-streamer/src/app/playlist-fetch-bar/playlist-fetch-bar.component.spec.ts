import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFetchBarComponent } from './playlist-fetch-bar.component';

describe('PlaylistFetchBarComponent', () => {
  let component: PlaylistFetchBarComponent;
  let fixture: ComponentFixture<PlaylistFetchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistFetchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistFetchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
