import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import * as Flow from "@flowjs/flow.js";
import {AuthenticationService} from "app/src/services/authentication.service";
import {SubmissionService} from "app/src/services/submission.service";

@Component({
  selector: "src-voice-recorder",
  templateUrl: "./voice-recorder.component.html"
})
export class VoiceRecorderComponent implements OnInit {
  @Input() uploads: any;
  @Input() field: any;
  @Input() fileUploadUrl: any;
  @Input() entryIndex: any;
  @Input() fieldEntry: any;
  _fakeModel: any;
  fileInput: any;
  seconds: number = 0;
  activeButton: string | null = null;
  isRecording: boolean = false;
  audioPlayer: string | null = null;
  mediaRecorder: MediaRecorder | null = null;
  context: AudioContext = new AudioContext();
  mediaStreamDestination: MediaStreamAudioDestinationNode = new MediaStreamAudioDestinationNode(this.context);
  recorder: MediaRecorder = new MediaRecorder(this.mediaStreamDestination.stream);
  recording_blob: any = null;
  flow: Flow;
  secondsTracker: any = null;
  startTime: number;
  stopButton: boolean;
  recordButton: boolean;
  vars: any;
  chunks: never[];
  file: Flow;

  @Output() notifyFileUpload: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected authenticationService: AuthenticationService, private submissionService: SubmissionService) {
  }

  ngOnInit(): void {
    this.fileInput = this.field ? this.field.id : "status_page";
    this.uploads[this.fileInput] = {files: []};
  }

  async initAudioContext(stream: MediaStream): Promise<void> {
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    await this.enableNoiseSuppression(stream);

    const source = this.context.createMediaStreamSource(stream);
    const filter1 = this.createHighPassFilter(this.context);
    const filter2 = this.createLowPassFilter(this.context);
    const filter3 = this.createDynamicCompressor(this.context);

    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(filter3);
    filter3.connect(this.mediaStreamDestination);
  }

  triggerRecording(fileId: any): void {
    this.activeButton = "record";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({audio: true})
        .then((stream) => {
          this.startRecording(fileId, stream);
        })
        .catch(() => {
          this.activeButton = null;
        });
    }
  }

  startRecording(fileId: string, stream: MediaStream): void {
    this.isRecording = true;
    this.audioPlayer = "";
    this.activeButton = "record";
    this.seconds = 0;
    this.startTime = Date.now();
    this.flow = new Flow({
      target: this.fileUploadUrl,
      speedSmoothingFactor: 0.01,
      singleFile: this.field !== undefined && !this.field.multi_entry,
      allowDuplicateUploads: false,
      testChunks: false,
      permanentErrors: [500, 501],
      headers: {"X-Session": this.authenticationService.session.id},
      query: {
        type: "audio.webm",
        reference: fileId,
      },
    });

    this.secondsTracker = setInterval(() => {
      this.seconds += 1;
      if (this.seconds > this.field.attrs.max_len.value) {
        this.isRecording = false;
        clearInterval(this.secondsTracker);
        this.secondsTracker = null;
        this.stopRecording();
      }
    }, 1000);

    this.mediaRecorder = new MediaRecorder(stream);
    this.initAudioContext(stream).then(() => {
      this.mediaRecorder?.start();
      this.recorder?.start();
    });
  }


  async stopRecording(): Promise<void> {
    // this.vars["recording"] = false;
    this.mediaRecorder?.stop();
    this.recorder?.stop();
    const tracks = this.mediaRecorder?.stream.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
    const dataAvailablePromise = new Promise<{ data: Blob | null, name: string, relativePath: string }>((resolve) => {
      this.mediaRecorder!.ondataavailable = (e: BlobEvent) => {
        resolve({
          data: e.data,
          name: "audio.webm",
          relativePath: "audio.webm"
        });
      };
    });

    const {data, name, relativePath} = await dataAvailablePromise;
    this.recording_blob = data;
    this.recording_blob.name = name;
    this.recording_blob.relativePath = relativePath;
    this.isRecording = false;
    this.recordButton = false;
    this.stopButton = true;
    this.activeButton = null;
    clearInterval(this.secondsTracker);
    this.secondsTracker = null;

    if (this.seconds < this.field.attrs.min_len.value) {
      this.deleteRecording();
      return;
    }

    if (this.mediaRecorder && (this.mediaRecorder.state === "recording" || this.mediaRecorder.state === "paused")) {
      this.mediaRecorder.stop();
    }
    this.onStop();
  }

  onStop() {
    this.flow.files = [];
    if (this.uploads.hasOwnProperty(this.fileInput)) {
      delete this.uploads[this.fileInput];
    }
    if (this.seconds >= parseInt(this.field.attrs.min_len.value) && this.seconds <= parseInt(this.field.attrs.max_len.value)) {
      this.audioPlayer = URL.createObjectURL(this.recording_blob);
      this.flow.addFile(this.recording_blob);
      this.uploads[this.fileInput] = this.flow;
      this.submissionService.setSharedData(this.flow);
    }
  }

  deleteRecording(): void {
    if (this.flow) {
      this.flow.cancel();
    }
    this.chunks = [];
    this.mediaRecorder = null;
    this.seconds = 0;
    this.audioPlayer = null;
    this.submissionService.setSharedData(null);
    delete this.uploads[this.fileInput];
  }

  async enableNoiseSuppression(stream: MediaStream): Promise<void> {
    const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    if ("noiseSuppression" in supportedConstraints) {
      const settings = {noiseSuppression: true};
      stream.getAudioTracks().forEach(track => {
        track.applyConstraints(settings);
      });
    }
  }

  createHighPassFilter(audioContext: AudioContext): BiquadFilterNode {
    const filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 300;
    return filter;
  }

  createLowPassFilter(audioContext: AudioContext): BiquadFilterNode {
    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 3000;
    return filter;
  }

  createDynamicCompressor(audioContext: AudioContext): DynamicsCompressorNode {
    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    // compressor.reduction.value = -20;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    return compressor;
  }

}
