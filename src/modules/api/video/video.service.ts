import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as videos from './videos.json';

const PATH_TO_RESOURCES = path.join(__dirname, '../../..', 'resources');
const PATH_TO_VIDEOS_DIR = path.join(PATH_TO_RESOURCES, 'videos');
const PATH_TO_IMAGES_DIR = path.join(PATH_TO_RESOURCES, 'images');
const IMG_EXTENSIONS = {
  jpg: 'jpg',
};
const VIDEO_EXTENSIONS = {
  mp4: 'mp4',
};

@Injectable()
export class VideoService {
  private pathToFile: string;

  public getVideos(): Promise<any> {
    const videosWithThumbnails = videos.map((video) => {
      if (video.thumbnail) {
        return {
          ...video,
          thumbnail: this.getThumbnail(video.thumbnail),
        };
      }

      return { ...video };
    });

    return Promise.resolve(JSON.stringify(videosWithThumbnails));
  }

  public getVideo(id: number, range?: string): Promise<any> {
    this.pathToFile = path.join(
      PATH_TO_VIDEOS_DIR,
      `${id}.${VIDEO_EXTENSIONS.mp4}`,
    );

    return new Promise((resolve, reject) => {
      const stats = fs.statSync(this.pathToFile);
      const fileSize = stats.size;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const stream = fs.createReadStream(this.pathToFile, {
          start,
          end,
        });

        stream.on('data', (chunk) => {
          resolve({
            info: {
              chunksize,
              start,
              end,
            },
            chunk,
          });
        });
      }

      return this.retrieveFile(resolve, reject);
    });
  }

  private getThumbnail(id: string) {
    this.pathToFile = path.join(
      PATH_TO_IMAGES_DIR,
      `${id}.${IMG_EXTENSIONS.jpg}`,
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
