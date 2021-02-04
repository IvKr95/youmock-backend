import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('/:id')
  getVideo(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.videoService
      .getVideo(id)
      .then((data) => {
        res.status(HttpStatus.OK).header('Content-Type', 'image/jpg').end(data);
      })
      .catch((error) => {
        res.status(500).header('Content-Type', 'text/html').end(error);
      });
  }

  @Get()
  getVideos(@Res({ passthrough: true }) res: Response): Promise<any> {
    return this.videoService
      .getVideos()
      .then((data) => {
        res
          .status(HttpStatus.OK)
          .header('Content-Type', 'application/json')
          .end(data);
      })
      .catch((error) => {
        res.status(500).header('Content-Type', 'text/html').end(error);
      });
  }
}
