import React, { Component, Fragment } from 'react';
import { getAudioStream } from '../util/media-devices';

interface IRecorderState {
  audioAvailable: boolean;
  audioUrl: string;
  isRecording: boolean;
  recorder: any; // TODO: Get types for this.
}

interface IDataAvailableEvent {
  data: Blob;
}

export interface IRecorderProps {
  onStart?: () => {};
  onDataAvailable?: (e: IDataAvailableEvent) => {};
  onStop?: (audioUrl: string, state: IRecorderState) => {};
}

const DATA_AVAILABLE_INTERVAL = 500;

export const BaseRecorder = class BaseRecorder extends Component<IRecorderProps, IRecorderState> {
  state: IRecorderState = {
    audioAvailable: false,
    audioUrl: '',
    isRecording: false,
    recorder: null,
  };

  isSettingMediaRecorder: boolean = false;
  audioFragments: any[] = [];

  toggleRecord = () => {
    const { isRecording } = this.state;

    if (!isRecording) {
      this.record();
    } else {
      this.save();
    }
  }

  getStream = () => {
    console.warn('This method should be overwritten. Or use video-recorder or audio-recorder. Returning `getAudioStream` by default.');
    return getAudioStream();
  }

  record = async () => {
    const { recorder } = this.state;

    if (!recorder) {
      this.isSettingMediaRecorder = true;

      return this.getStream()
        .then(stream => {
          // @ts-ignore -- Check what's up with the types
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = (e: IDataAvailableEvent) => {
            this.audioFragments.push(e.data);

            const { onDataAvailable } = this.props;

            if (onDataAvailable) {
              onDataAvailable(e);
            }
          }

          mediaRecorder.onstop = () => {
            const { audioFragments } = this;

            /*
             * This prevents the 416 error from happening.
             * This forces the media recorder to create a new Blob when the recording is stopped.
             */
            const audioBlob = new Blob(audioFragments, { 'type' : 'audio/ogg; codecs=opus' });
            const audioUrl = URL.createObjectURL(audioBlob);

            this.audioFragments = [];

            this.setState({
              isRecording: false,
              audioAvailable: true,
              audioUrl,
            }, () => {
              const { onStop } = this.props;

              if (onStop) {
                onStop(audioUrl, this.state);
              }
            });
          }

          this.setState({
            recorder: mediaRecorder,
            isRecording: true,
          }, () => {
            mediaRecorder.start(DATA_AVAILABLE_INTERVAL);

            const { onStart } = this.props;

            if (onStart) {
              onStart();
            }
          });
        });
    }

    recorder.start();

    this.setState({
      isRecording: true,
    });
  }

  save = () => {
    const { recorder } = this.state;

    recorder.stop();
  }

  render() {
    const { audioAvailable, isRecording, audioUrl } = this.state;
    const buttonLabel = isRecording ? 'Stop' : 'Record';
    const showAudio = audioAvailable && !isRecording;

    return (
      <Fragment>
        <h2>Press the button to record your message.</h2>
        <button onClick={this.toggleRecord}>{buttonLabel}</button>
        {showAudio && (
          <audio controls src={audioUrl}></audio>
        )}
      </Fragment>
    )
  }
}