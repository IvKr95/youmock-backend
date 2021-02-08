import {
  Controller,
  Get,
  Headers,
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
    @Res() res: Response,
    @Headers('Range') range?: string,
  ): Promise<any> {
    return this.videoService
      .getVideo(id, range)
      .then((data) => {
        res
          .status(HttpStatus.OK)
          .header('Content-Type', 'video/webm')
          .end(data);
      })
      .catch((error) => {
        res
          .status(error.status)
          .header('Content-Type', 'application/json')
          .json(error);
      });
  }

  @Get()
  async getVideos(@Res() res: Response): Promise<any> {
    try {
      const data = await this.videoService.getVideos();

      res
        .status(HttpStatus.OK)
        .header('Content-Type', 'application/json')
        .end(data);
    } catch (error) {
      res.status(error.status).header('Content-Type', 'text/html').end(error);
    }
  }
}
