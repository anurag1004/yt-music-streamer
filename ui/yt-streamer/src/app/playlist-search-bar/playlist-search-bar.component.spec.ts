import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSearchBarComponent } from './playlist-search-bar.component';

describe('PlaylistSearchBarComponent', () => {
  let component: PlaylistSearchBarComponent;
  let fixture: ComponentFixture<PlaylistSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
