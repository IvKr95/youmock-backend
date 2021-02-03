import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';
import { VideoDto } from './video.dto';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  getVideos(@Res({ passthrough: true }) res: Response) {
    require('fs').readFile('../../resources/images/cat-1.jpg', (err, data) => {
      if (err) {
        return 'error';
      }

      res.status(HttpStatus.OK).header('Content-Type', 'image/jpeg');

      return data;
    })
  }
}
