import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideoService {
  private pathToFile: string;

  public getVideos(): Promise<any> {
    this.pathToFile = path.join(__dirname, 'videos.json');

    return new Promise((resolve, reject) => {
      this.retrieveFile(resolve, reject);
    }).then((data: string) => {
      const videos = JSON.parse(data);

      const videosWithThumbnails = videos.map((video) => {
        if (video.thumbnail) {
          return {
            ...video,
            thumbnail: this.getThumbnail(video.thumbnail),
          };
        }

        return { ...video };
      });

      return JSON.stringify(videosWithThumbnails);
    });
  }

  public getVideo(id: number): Promise<any> {
    this.pathToFile = path.join(
      __dirname,
      '../../..',
      'resources',
      'images',
      `${id}.jpg`,
    );

    return new Promise((resolve, reject) => {
      this.retrieveFile(resolve, reject);
    });
  }

  private getThumbnail(id: string) {
    this.pathToFile = path.join(
      __dirname,
      '../../..',
      'resources',
      'images',
      `${id}.jpg`,
    );

    return fs.readFileSync(this.pathToFile);
  }

  private retrieveFile(resolve, reject) {
    fs.access(this.pathToFile, (err) => {
      if (err) {
        reject(new NotFoundException('not found'));
      }

      fs.readFile(this.pathToFile, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }
}
