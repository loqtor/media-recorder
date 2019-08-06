import * as React from 'react';
import { BaseRecorder, IRecorderProps } from './base-recorder';
import { getVideoStream } from '../util/media-devices';

interface IVideoRecorderProps extends IRecorderProps {
  muteRecord: boolean;
}

export const VideoRecorder = class VideoRecorder extends BaseRecorder {
  getStream = () => {
    const { muteRecord } = this.props as IVideoRecorderProps; 

    return getVideoStream({ audio: !muteRecord });
  }

  renderResult = () => {
    const { mediaUrl } = this.state;
    return (<video src={mediaUrl} controls></video>);
  }
}