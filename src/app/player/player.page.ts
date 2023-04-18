import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArtworkService } from '../artwork.service';
import { PlayerService, PlayerCmds } from '../player.service';
import { ParentalService } from '../parental.service';
import { Media } from '../media';
import { interval} from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

  media: Media;
  cover = '';
  playing = true;
  hasPlaytime = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artworkService: ArtworkService,
    private playerService: PlayerService,
    private parentalService: ParentalService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.media = this.router.getCurrentNavigation().extras.state.media;
      }
    });
  }

  ngOnInit() {
    
    this.artworkService.getArtwork(this.media).subscribe(url => {
      this.cover = url;
    });

    // Retrieve the hasPlaytime status every 5 seconds
    interval(5000).subscribe(() => {
      this.parentalService.hasPlaytime().subscribe(hasPlaytime => {
        this.hasPlaytime = hasPlaytime;
      });
    });

    // Retreive the hasPlaytime status
    this.parentalService.hasPlaytime().subscribe(hasPlaytime => {
      this.hasPlaytime = hasPlaytime;
    });
    
  }

  ionViewWillEnter() {
    if (this.media) {
      this.playerService.sendCmd(PlayerCmds.CLEARQUEUE);

      window.setTimeout(() => {
        this.playerService.playMedia(this.media);
      }, 1000);
    }
  }

  ionViewWillLeave() {
    this.playerService.sendCmd(PlayerCmds.PAUSE);
  }

  volUp() {
    this.playerService.sendCmd(PlayerCmds.VOLUMEUP);
  }

  volDown() {
    this.playerService.sendCmd(PlayerCmds.VOLUMEDOWN);
  }

  skipPrev() {
    this.playerService.sendCmd(PlayerCmds.PREVIOUS);
  }

  skipNext() {
    this.playerService.sendCmd(PlayerCmds.NEXT);
  }

  playPause() {
    if (this.playing) {
      this.playing = false;
      this.playerService.sendCmd(PlayerCmds.PAUSE);
    } else {
      this.playing = true;
      this.playerService.sendCmd(PlayerCmds.PLAY);
    }
  }
}
