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

  renderPreview = () => {
    const { isRecording } = this.state;
    const style = isRecording ? {} : { display: 'none' };

    return (
      <video
        ref={(element: HTMLVideoElement) => this.previewElement = element}
        style={style}
        autoPlay
        muted
      />
    );
  }

  renderResult = () => {
    const { mediaUrl } = this.state;
    return (<video src={mediaUrl} controls></video>);
  }
}