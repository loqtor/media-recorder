import * as React from 'react';
import { BaseRecorder, IRecorderProps } from './base-recorder';
import { getAudioStream } from '../util/media-devices';

export const AudioRecorder = class AudioRecorder extends BaseRecorder {
  getStream = () => getAudioStream();

  renderPreview = () => {
    const { isRecording } = this.state;
    const style = isRecording ? {} : { display: 'none' };

    return (
      <audio
        ref={(element: HTMLAudioElement) => this.previewElement = element}
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