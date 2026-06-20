/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  video_styles_default
} from "./chunk.7ED4Z6WL.js";
import {
  WebAwesomeElement,
  e,
  n,
  r,
  t
} from "./chunk.UOQDI3PT.js";
import {
  LocalizeController
} from "./chunk.O2TYCFDI.js";
import {
  E,
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/video/video.ts
var WaVideo = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    // ─── Controllers ────────────────────────────────────────────────────────────
    this.localize = new LocalizeController(this);
    this.showPoster = true;
    this.playbackRate = 1;
    this.controlsVisible = false;
    this.isVolumePopoverOpen = false;
    this.seekIndicator = null;
    this.currentPoster = "";
    this.currentTitle = "";
    this.showCaptions = false;
    this.availableCaptions = [];
    this.currentCaptionIndex = -1;
    this.customCaptions = [];
    this.currentCaption = "";
    this.thumbnailData = [];
    this.showThumbnail = false;
    this.thumbnailPosition = 0;
    this.currentThumbnail = null;
    this.isMobile = false;
    this.isCompact = false;
    this.controls = "standard";
    this.thumbnails = "";
    this.src = "";
    this.poster = "";
    this.title = "";
    this.playing = false;
    this.muted = false;
    this.volume = 1;
    this.duration = 0;
    this.currentTime = 0;
    this.autoplay = false;
    this.loop = false;
    this.autoplayMuted = false;
    this.autoplayOnVisible = false;
    this.preload = "metadata";
    this.iconLibrary = "system";
    // ─── Private Fields ──────────────────────────────────────────────────────────
    // Some browsers (e.g. iOS Safari) make HTMLMediaElement.volume read-only; detect by feature test
    this.supportsVolumeControl = (() => {
      if (typeof document === "undefined") {
        return false;
      }
      if (!("createElement" in document)) {
        return false;
      }
      const video = document.createElement("video");
      video.volume = 0.5;
      return video.volume === 0.5;
    })();
    this.speedOptions = [
      { value: 0.25, label: "0.25x" },
      { value: 0.5, label: "0.5x" },
      { value: 0.75, label: "0.75x" },
      { value: 1, label: "1x" },
      { value: 1.25, label: "1.25x" },
      { value: 1.5, label: "1.5x" },
      { value: 1.75, label: "1.75x" },
      { value: 2, label: "2x" }
    ];
    this.isScrubbing = false;
    this.wasPlayingBeforeScrub = false;
    this.isNativeSeeking = false;
    this.currentTimeSetFromNative = false;
    this.wasPlayingBeforeHidden = false;
    this.resizeObserver = null;
    this.intersectionObserver = null;
    this.coarsePointerQuery = null;
    this.hideControlsTimer = null;
    this.seekIndicatorTimer = null;
    this.lastTapTime = 0;
    this.lastTapX = 0;
    this.sources = [];
    this.tracks = [];
    // External listeners (arrow functions for addEventListener compatibility) ─────
    this.handleFullscreenChange = () => {
      if (this.videoElement) {
        this.currentTimeSetFromNative = true;
        this.currentTime = this.videoElement.currentTime;
        this.playbackRate = this.videoElement.playbackRate;
        this.volume = this.videoElement.volume;
        this.muted = this.videoElement.muted;
        this.playing = !this.videoElement.paused;
      }
      this.toggleAttribute("fullscreen", this.isFullscreen);
      this.requestUpdate();
    };
    this.handlePointerTypeChange = () => {
      const w = this.offsetWidth;
      const coarse = this.coarsePointerQuery?.matches ?? false;
      this.isMobile = w < 480 || coarse;
      this.isCompact = w >= 480 && w < 640 && !coarse;
    };
    this.handleKeyDown = (e2) => {
      const handled = ["Space", " ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "k", "m", "f", "c"];
      if (handled.includes(e2.key) || e2.key >= "0" && e2.key <= "9") {
        e2.preventDefault();
      }
      switch (e2.key) {
        case " ":
        case "Space":
        case "k":
          this.togglePlay();
          break;
        case "ArrowLeft":
          if (this.videoElement) this.videoElement.currentTime = Math.max(0, this.videoElement.currentTime - 5);
          break;
        case "ArrowRight":
          if (this.videoElement)
            this.videoElement.currentTime = Math.min(this.duration, this.videoElement.currentTime + 5);
          break;
        case "ArrowUp":
          this.volume = Math.min(1, this.volume + 0.1);
          if (this.videoElement) {
            this.videoElement.volume = this.volume;
            this.muted = false;
            this.videoElement.muted = false;
          }
          break;
        case "ArrowDown":
          this.volume = Math.max(0, this.volume - 0.1);
          if (this.videoElement) this.videoElement.volume = this.volume;
          break;
        case "m":
          this.toggleMute();
          break;
        case "f":
          this.toggleFullscreen();
          break;
        case "c":
          if (this.availableCaptions.length > 0) {
            this.handleCaptionSelect(this.showCaptions ? -1 : 0);
          }
          break;
        default:
          if (e2.key >= "0" && e2.key <= "9") {
            const percent = parseInt(e2.key) * 10;
            if (this.videoElement) {
              this.videoElement.currentTime = this.duration * percent / 100;
            }
          }
          break;
      }
    };
  }
  // ─── Lifecycle ───────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.connectedCallback();
      });
      return;
    }
    if (this.tabIndex < 0) this.tabIndex = 0;
    const initW = this.offsetWidth;
    const initCoarse = this.coarsePointerQuery?.matches ?? navigator.maxTouchPoints > 0;
    this.isMobile = initW < 480 || initCoarse;
    this.isCompact = initW >= 480 && initW < 640 && !initCoarse;
    this.addListeners();
    this.resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          const coarse = this.coarsePointerQuery?.matches ?? false;
          this.isMobile = w < 480 || coarse;
          this.isCompact = w >= 480 && w < 640 && !coarse;
        }
      });
    });
    this.resizeObserver.observe(this);
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && this.playing) {
          this.wasPlayingBeforeHidden = true;
          this.pause();
        } else if (entry.isIntersecting && this.wasPlayingBeforeHidden) {
          this.wasPlayingBeforeHidden = false;
          if (this.autoplayOnVisible) this.play();
        }
      },
      { threshold: 0.2 }
    );
    this.intersectionObserver.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.clearAllTimeouts();
  }
  firstUpdated() {
    if (this.autoplayMuted) {
      this.muted = true;
    }
  }
  updated(changedProperties) {
    if (!this.videoElement) return;
    if (changedProperties.has("currentTime") && !this.isScrubbing && !this.isNativeSeeking) {
      if (!this.currentTimeSetFromNative && Math.abs(this.videoElement.currentTime - this.currentTime) > 0.5) {
        this.videoElement.currentTime = this.currentTime;
      }
      this.currentTimeSetFromNative = false;
    }
    if (changedProperties.has("volume")) {
      this.videoElement.volume = this.volume;
    }
    if (changedProperties.has("muted")) {
      this.videoElement.muted = this.muted;
    }
    if (changedProperties.has("playbackRate")) {
      this.videoElement.playbackRate = this.playbackRate;
    }
    if (changedProperties.has("src")) {
      this.syncVideoSources();
    }
  }
  // ─── Public API ─────────────────────────────────────────────────────────────
  /** Starts playback. */
  play() {
    if (this.videoElement) {
      this.videoElement.play().catch((err) => {
        if (err.name !== "AbortError") console.error("Play failed:", err);
      });
    }
  }
  /** Pauses playback. */
  pause() {
    if (this.videoElement) {
      this.videoElement.pause();
    }
  }
  /** Toggles between play and pause. */
  togglePlay() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }
  /** Toggles the muted state. */
  toggleMute() {
    if (this.videoElement) {
      this.videoElement.muted = !this.videoElement.muted;
      this.muted = this.videoElement.muted;
    }
  }
  /**
   * Seeks to a specific time in the video.
   * @param time - Time in seconds
   */
  seek(time) {
    if (this.videoElement && time >= 0 && time <= this.duration) {
      this.videoElement.currentTime = time;
      this.currentTime = time;
    }
  }
  /**
   * Sets the volume level.
   * @param volume - Volume level between 0 and 1
   */
  setVolume(volume) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.volume = clampedVolume;
    if (this.videoElement) {
      this.videoElement.volume = clampedVolume;
      this.muted = clampedVolume === 0;
      this.videoElement.muted = clampedVolume === 0;
    }
  }
  /**
   * Sets the playback rate (speed).
   * @param rate - Playback rate (0.25, 0.5, 1, 1.25, 1.5, 2)
   */
  setPlaybackRate(rate) {
    const validRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const closestRate = validRates.reduce(
      (prev, curr) => Math.abs(curr - rate) < Math.abs(prev - rate) ? curr : prev
    );
    this.playbackRate = closestRate;
    if (this.videoElement) {
      this.videoElement.playbackRate = closestRate;
    }
  }
  /** Enters fullscreen mode. */
  async requestFullscreen() {
    if (this.videoElement && !this.isFullscreen) {
      try {
        if (Element.prototype.requestFullscreen && document.fullscreenEnabled) {
          await Element.prototype.requestFullscreen.call(this);
        } else if (this.videoElement.webkitEnterFullscreen) {
          this.videoElement.webkitEnterFullscreen();
        }
      } catch (error) {
        console.error("Failed to enter fullscreen:", error);
      }
    }
  }
  /** Exits fullscreen mode. */
  async exitFullscreen() {
    if (this.videoElement?.webkitDisplayingFullscreen) {
      this.videoElement.webkitExitFullscreen();
    } else if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error("Failed to exit fullscreen:", error);
      }
    }
  }
  /** Gets the native video element. */
  getVideoElement() {
    return this.videoElement;
  }
  /** Gets the current playback state. */
  getState() {
    return {
      playing: this.playing,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      muted: this.muted,
      playbackRate: this.playbackRate
    };
  }
  // ─── Media Session ──────────────────────────────────────────────────────────
  get isMediaSessionOwner() {
    return mediaSessionOwner === this;
  }
  claimMediaSession() {
    mediaSessionOwner = this;
    this.setupMediaSession();
  }
  activateMediaSession() {
    if (!this.isMediaSessionOwner) return;
    this.syncMediaSessionMetadata();
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
  }
  releaseMediaSession() {
    if (!this.isMediaSessionOwner) return;
    mediaSessionOwner = null;
    this.teardownMediaSession();
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "none";
      navigator.mediaSession.metadata = null;
    }
  }
  setupMediaSession() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setActionHandler("play", () => this.play());
    navigator.mediaSession.setActionHandler("pause", () => this.pause());
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime !== void 0) this.seek(details.seekTime);
    });
    navigator.mediaSession.setActionHandler("seekbackward", (details) => {
      this.seek(Math.max(0, this.currentTime - (details.seekOffset ?? 10)));
    });
    navigator.mediaSession.setActionHandler("seekforward", (details) => {
      this.seek(Math.min(this.duration, this.currentTime + (details.seekOffset ?? 10)));
    });
  }
  teardownMediaSession() {
    if (!("mediaSession" in navigator)) return;
    for (const action of ["play", "pause", "seekto", "seekbackward", "seekforward"]) {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch {
      }
    }
  }
  syncMediaSessionMetadata() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: this.currentTitle || "",
      artwork: this.currentPoster ? [{ src: this.currentPoster }] : []
    });
  }
  // ─── Data Loading ────────────────────────────────────────────────────────────
  syncVideoSources() {
    if (!this.slotElement) return;
    const slottedElements = this.slotElement.assignedElements({ flatten: true });
    const sourceElements = slottedElements.filter(
      (el) => el.tagName.toLowerCase() === "source"
    );
    const trackElements = slottedElements.filter((el) => el.tagName.toLowerCase() === "track");
    if (sourceElements.length > 0) {
      this.sources = sourceElements.map((source) => ({
        src: source.getAttribute("src") || "",
        type: source.getAttribute("type") || "video/mp4"
      }));
    } else if (this.src) {
      this.sources = [{ src: this.src, type: "video/mp4" }];
    } else {
      this.sources = [];
    }
    this.tracks = trackElements.map((track) => ({
      src: track.getAttribute("src") || "",
      kind: track.getAttribute("kind") || "subtitles",
      srclang: track.getAttribute("srclang") || "",
      label: track.getAttribute("label") || ""
    }));
    this.currentPoster = this.poster;
    this.currentTitle = this.title;
    this.showPoster = !this.autoplay;
    this.requestUpdate();
    this.updateComplete.then(() => {
      if (this.videoElement) {
        this.videoElement.load();
        this.updateAvailableCaptions();
        if (this.autoplay) this.play();
      }
    });
  }
  updateAvailableCaptions() {
    if (!this.videoElement) return;
    const textTracks = this.videoElement.textTracks;
    this.availableCaptions = [];
    for (let i = 0; i < textTracks.length; i++) {
      const track = textTracks[i];
      if (track.kind === "subtitles" || track.kind === "captions") {
        this.availableCaptions.push({
          index: i,
          label: track.label || track.language || `Track ${i + 1}`,
          language: track.language
        });
      }
    }
  }
  updateCustomCaptions() {
    if (!this.showCaptions || this.customCaptions.length === 0) {
      this.currentCaption = "";
      return;
    }
    const activeCue = this.customCaptions.find(
      (cue) => this.currentTime >= cue.startTime && this.currentTime <= cue.endTime
    );
    this.currentCaption = activeCue ? activeCue.text : "";
  }
  async loadThumbnails() {
    if (!this.thumbnails) return;
    try {
      const response = await fetch(this.thumbnails);
      const vttText = await response.text();
      this.parseThumbnailVTT(vttText);
    } catch (error) {
      console.error("Failed to load thumbnails:", error);
    }
  }
  parseThumbnailVTT(vttText) {
    const lines = vttText.split("\n");
    const thumbnails = [];
    let i = 0;
    while (i < lines.length && !lines[i].includes("-->")) i++;
    while (i < lines.length) {
      const line = lines[i].trim();
      if (line.includes("-->")) {
        const [startTime] = line.split("-->").map((s) => s.trim());
        const time = this.parseVTTTimestamp(startTime);
        i++;
        if (i < lines.length) {
          const urlLine = lines[i].trim();
          const match = urlLine.match(/(.+?)#xywh=(\d+),(\d+),(\d+),(\d+)/);
          if (match) {
            thumbnails.push({
              time,
              url: match[1],
              x: parseInt(match[2]),
              y: parseInt(match[3]),
              w: parseInt(match[4]),
              h: parseInt(match[5])
            });
          }
        }
      }
      i++;
    }
    this.thumbnailData = thumbnails;
  }
  parseVTT(vttText) {
    const lines = vttText.split("\n");
    const cues = [];
    let i = 0;
    while (i < lines.length && !lines[i].includes("-->")) i++;
    while (i < lines.length) {
      const line = lines[i].trim();
      if (line.includes("-->")) {
        const timeMatch = line.match(/^([\d:.]+)\s*-->\s*([\d:.]+)/);
        if (timeMatch) {
          const startTime = this.parseVTTTimestamp(timeMatch[1]);
          const endTime = this.parseVTTTimestamp(timeMatch[2]);
          i++;
          let text = "";
          while (i < lines.length && lines[i].trim() !== "") {
            text += (text ? "\n" : "") + lines[i].trim();
            i++;
          }
          if (text) cues.push({ startTime, endTime, text });
        }
      }
      i++;
    }
    return cues;
  }
  async loadCustomCaptions(trackIndex) {
    if (this.tracks.length === 0) {
      this.customCaptions = [];
      return;
    }
    const subtitleTrack = trackIndex !== void 0 ? this.tracks[trackIndex] : this.tracks.find((track) => track.kind === "subtitles" || track.kind === "captions");
    if (!subtitleTrack) {
      this.customCaptions = [];
      return;
    }
    try {
      const response = await fetch(subtitleTrack.src);
      const vttText = await response.text();
      this.customCaptions = this.parseVTT(vttText);
    } catch (error) {
      console.error("Failed to load custom captions:", error);
      this.customCaptions = [];
    }
  }
  parseVTTTimestamp(timestamp) {
    const parts = timestamp.split(":");
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);
    } else if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return parseInt(minutes) * 60 + parseFloat(seconds);
    }
    return 0;
  }
  getThumbnailForTime(time) {
    if (this.thumbnailData.length === 0) return null;
    let closest = this.thumbnailData[0];
    for (const thumb of this.thumbnailData) {
      if (thumb.time <= time) {
        closest = thumb;
      } else {
        break;
      }
    }
    return closest;
  }
  // ─── Playback Helpers ────────────────────────────────────────────────────────
  get isFullscreen() {
    if (typeof document === "undefined") {
      return false;
    }
    return !!(document.fullscreenElement || document.webkitFullscreenElement || this.videoElement?.webkitDisplayingFullscreen);
  }
  formatTime(seconds) {
    const s = Math.floor(seconds || 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = String(s % 60).padStart(2, "0");
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
  }
  showControlsTemporarily() {
    this.controlsVisible = true;
    if (this.hideControlsTimer !== null) window.clearTimeout(this.hideControlsTimer);
    this.hideControlsTimer = window.setTimeout(() => {
      this.controlsVisible = false;
      this.hideControlsTimer = null;
    }, 3e3);
  }
  clearAllTimeouts() {
    if (this.hideControlsTimer !== null) {
      window.clearTimeout(this.hideControlsTimer);
      this.hideControlsTimer = null;
    }
    if (this.seekIndicatorTimer !== null) {
      window.clearTimeout(this.seekIndicatorTimer);
      this.seekIndicatorTimer = null;
    }
  }
  getClientX(e2) {
    return e2 instanceof TouchEvent ? e2.touches[0].clientX : e2.clientX;
  }
  async toggleFullscreen() {
    if (this.isFullscreen) {
      await this.exitFullscreen();
    } else {
      await this.requestFullscreen();
    }
  }
  async togglePictureInPicture() {
    if (!this.videoElement) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await this.videoElement.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-Picture error:", error);
    }
  }
  // ─── Listener Management ─────────────────────────────────────────────────────
  addListeners() {
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    this.addEventListener("keydown", this.handleKeyDown);
    this.coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    this.coarsePointerQuery.addEventListener("change", this.handlePointerTypeChange);
  }
  removeListeners() {
    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.coarsePointerQuery?.removeEventListener("change", this.handlePointerTypeChange);
    this.coarsePointerQuery = null;
  }
  // ─── Event Handlers ──────────────────────────────────────────────────────────
  // Native video ───────────────────────────────────────────────────────────────
  handlePlay(e2) {
    this.playing = true;
    this.showPoster = false;
    if (!this.isMediaSessionOwner) this.claimMediaSession();
    this.activateMediaSession();
    this.relayNativeEvent(e2);
  }
  handlePause(e2) {
    this.playing = false;
    if (this.hideControlsTimer !== null) {
      window.clearTimeout(this.hideControlsTimer);
      this.hideControlsTimer = null;
      this.controlsVisible = false;
    }
    this.relayNativeEvent(e2);
  }
  handleTimeUpdate(_e) {
    if (!this.videoElement || this.isScrubbing || this.isNativeSeeking) return;
    this.currentTimeSetFromNative = true;
    this.currentTime = this.videoElement.currentTime;
    this.updateCustomCaptions();
    this.dispatchEvent(new Event("timeupdate"));
  }
  handleLoadedMetadata(e2) {
    if (this.videoElement) {
      this.duration = this.videoElement.duration;
      this.relayNativeEvent(e2);
      this.loadThumbnails();
      this.updateAvailableCaptions();
      this.loadCustomCaptions();
    }
  }
  handleVolumeChange(e2) {
    if (this.videoElement) {
      this.volume = this.videoElement.volume;
      this.muted = this.videoElement.muted;
      this.relayNativeEvent(e2);
    }
  }
  handleRateChange() {
    if (this.videoElement) {
      this.playbackRate = this.videoElement.playbackRate;
    }
  }
  handleSeeking() {
    this.isNativeSeeking = true;
  }
  handleSeeked() {
    this.isNativeSeeking = false;
    if (this.videoElement && !this.isScrubbing) {
      this.currentTimeSetFromNative = true;
      this.currentTime = this.videoElement.currentTime;
      this.dispatchEvent(new Event("timeupdate"));
    }
  }
  handleError(e2) {
    console.error("Video error:", e2);
    this.relayNativeEvent(e2);
    if (this.videoElement?.error) {
      console.error("Error code:", this.videoElement.error.code);
      console.error("Error message:", this.videoElement.error.message);
    }
  }
  handleVideoEnded(e2) {
    this.relayNativeEvent(e2);
    this.playing = false;
    this.releaseMediaSession();
  }
  // Playback controls ──────────────────────────────────────────────────────────
  handlePosterClick() {
    this.showPoster = false;
    this.play();
    this.updateComplete.then(() => {
      this.shadowRoot?.querySelector(".video-wrapper")?.focus();
    });
  }
  handleVideoClick(e2) {
    if (this.videoElement?.webkitDisplayingFullscreen) return;
    if (this.isMobile) {
      const now = Date.now();
      if (now - this.lastTapTime < 300 && Math.abs(e2.clientX - this.lastTapX) < 60) {
        this.handleDoubleTap(e2);
        this.lastTapTime = 0;
        return;
      }
      this.lastTapTime = now;
      this.lastTapX = e2.clientX;
      this.showControlsTemporarily();
    } else {
      this.togglePlay();
    }
  }
  handleDoubleTap(e2) {
    const wrapperRect = e2.currentTarget.getBoundingClientRect();
    const isLeft = e2.clientX < wrapperRect.left + wrapperRect.width / 2;
    const delta = isLeft ? -10 : 10;
    if (this.videoElement) {
      this.videoElement.currentTime = Math.max(0, Math.min(this.duration, this.videoElement.currentTime + delta));
    }
    this.seekIndicator = isLeft ? "backward" : "forward";
    if (this.seekIndicatorTimer !== null) window.clearTimeout(this.seekIndicatorTimer);
    this.seekIndicatorTimer = window.setTimeout(() => {
      this.seekIndicator = null;
      this.seekIndicatorTimer = null;
    }, 600);
  }
  handleSpeedSelect(speed) {
    this.playbackRate = speed;
    if (this.videoElement) {
      this.videoElement.playbackRate = speed;
    }
  }
  handleMobileMenuSelect(e2) {
    const value = e2.detail.item?.value;
    if (!value) return;
    const rate = parseFloat(value);
    if (!isNaN(rate)) {
      this.handleSpeedSelect(rate);
    } else if (value === "pip") {
      this.togglePictureInPicture();
    } else if (value === "fullscreen") {
      this.toggleFullscreen();
    }
  }
  // Timeline ───────────────────────────────────────────────────────────────────
  handleTimelineInput(e2) {
    const slider = e2.target;
    this.currentTime = slider.value;
    if (!this.isScrubbing) {
      this.isScrubbing = true;
      this.wasPlayingBeforeScrub = this.playing;
      this.pause();
    }
    this.dispatchEvent(new Event("timeupdate"));
  }
  handleTimelineChange(e2) {
    const slider = e2.target;
    if (this.videoElement) {
      this.videoElement.currentTime = slider.value;
    }
    this.currentTime = slider.value;
    this.isScrubbing = false;
    if (this.wasPlayingBeforeScrub) {
      this.play();
    }
  }
  handleTimelinePointerMove(e2) {
    if (!this.timelineElement) return;
    const rect = this.timelineElement.getBoundingClientRect();
    const clientX = this.getClientX(e2);
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    this.thumbnailPosition = clientX - rect.left;
    this.showThumbnail = true;
    this.currentThumbnail = this.getThumbnailForTime(percent * this.duration);
  }
  handleTimelineMouseLeave() {
    this.showThumbnail = false;
  }
  // Volume ─────────────────────────────────────────────────────────────────────
  handleVolumeButtonEnter() {
    this.isVolumePopoverOpen = true;
  }
  handleVolumeButtonClick() {
    this.isVolumePopoverOpen = !this.isVolumePopoverOpen;
  }
  handleVolumePopoverEnter() {
    clearTimeout(this.volumePopoverCloseTimer);
    this.isVolumePopoverOpen = true;
  }
  handleVolumePopoverLeave() {
    if (!this.isMobile) {
      this.volumePopoverCloseTimer = setTimeout(() => {
        this.isVolumePopoverOpen = false;
      }, 300);
    }
  }
  handleVolumePopoverHide(e2) {
    const popover = e2.target;
    if (popover.matches(":hover")) {
      e2.preventDefault();
    }
  }
  handleVolumeSliderInput(e2) {
    const slider = e2.target;
    const newVolume = parseFloat(slider.value) / 100;
    this.volume = newVolume;
    if (this.videoElement) {
      this.videoElement.volume = newVolume;
      this.muted = newVolume === 0;
      this.videoElement.muted = newVolume === 0;
    }
  }
  handleVolumeSliderChange() {
    this.isVolumePopoverOpen = true;
  }
  // Captions ───────────────────────────────────────────────────────────────────
  handleCaptionSelect(trackIndex) {
    if (!this.videoElement) return;
    const textTracks = this.videoElement.textTracks;
    for (let i = 0; i < textTracks.length; i++) {
      textTracks[i].mode = "disabled";
    }
    if (trackIndex >= 0 && trackIndex < textTracks.length) {
      this.showCaptions = true;
      this.currentCaptionIndex = this.availableCaptions.findIndex((cap) => cap.index === trackIndex);
      this.loadCustomCaptions(trackIndex);
    } else {
      this.showCaptions = false;
      this.currentCaptionIndex = -1;
      this.currentCaption = "";
    }
    this.updateCustomCaptions();
  }
  handleSlotChange() {
    this.syncVideoSources();
  }
  // ─── Render ──────────────────────────────────────────────────────────────────
  renderCaptionsDropdown() {
    if (!this.availableCaptions.length) return E;
    return x`
      <wa-dropdown
        placement="top"
        distance="8"
        @wa-select=${(e2) => this.handleCaptionSelect(parseInt(e2.detail.item.value, 10))}
      >
        <wa-button
          id="captions-button"
          slot="trigger"
          appearance="plain"
          class="${this.showCaptions ? "captions-active" : ""}"
          aria-label=${this.localize.term("captions")}
          size="s"
        >
          <wa-icon
            library=${this.iconLibrary}
            name=${this.showCaptions ? "closed-captioning" : "closed-captioning-slash"}
          ></wa-icon>
        </wa-button>
        <wa-dropdown-item type="checkbox" value="-1" ?checked=${!this.showCaptions}>Off</wa-dropdown-item>
        ${this.availableCaptions.map(
      (caption, idx) => x`
            <wa-dropdown-item type="checkbox" value="${caption.index}" ?checked=${this.currentCaptionIndex === idx}
              >${caption.label}</wa-dropdown-item
            >
          `
    )}
      </wa-dropdown>
    `;
  }
  renderCompactOverflowMenu() {
    const pipAvailable = !!document.pictureInPictureEnabled;
    const speedLabel = this.speedOptions.find((o) => o.value === this.playbackRate)?.label ?? "1x";
    return x`
      <wa-dropdown placement="top-end" distance="8" @wa-select=${this.handleMobileMenuSelect}>
        <wa-button slot="trigger" appearance="plain" size="s" aria-label="${this.localize.term("moreOptions")}">
          <wa-icon library=${this.iconLibrary} name="ellipsis-vertical"></wa-icon>
        </wa-button>

        <wa-dropdown-item>
          <wa-icon slot="icon" library=${this.iconLibrary} name="gauge"></wa-icon>
          ${this.localize.term("playbackSpeed")}
          <span slot="details">${speedLabel}</span>
          ${this.speedOptions.map(
      (option) => x`
              <wa-dropdown-item
                slot="submenu"
                type="checkbox"
                value="${option.value}"
                ?checked=${this.playbackRate === option.value}
                >${option.label}</wa-dropdown-item
              >
            `
    )}
        </wa-dropdown-item>

        ${pipAvailable ? x`
              <wa-divider></wa-divider>
              <wa-dropdown-item value="pip">
                <wa-icon slot="icon" library=${this.iconLibrary} name="picture-in-picture"></wa-icon>
                ${this.localize.term("pictureInPicture")}
              </wa-dropdown-item>
            ` : E}

        <wa-divider></wa-divider>
        <wa-dropdown-item value="fullscreen">
          <wa-icon slot="icon" library=${this.iconLibrary} name=${this.isFullscreen ? "compress" : "expand"}></wa-icon>
          ${this.isFullscreen ? this.localize.term("exitFullscreen") : this.localize.term("enterFullscreen")}
        </wa-dropdown-item>
      </wa-dropdown>
    `;
  }
  renderDesktopControls() {
    const volumePercent = Math.round(this.volume * 100);
    const hasTimeline = this.controls === "standard" || this.controls === "full";
    return x`
      <div
        class="controls-overlay desktop-controls ${hasTimeline ? "has-timeline" : "no-timeline"}"
        part="controls-overlay"
      >
        <div class="controls" part="controls">
          <div class="controls-row">
            <div class="controls-row__start">
              <slot name="controls-start"></slot>
              <wa-button
                id="play-button"
                @click="${this.togglePlay}"
                appearance="plain"
                aria-label="${this.playing ? this.localize.term("pause") : this.localize.term("play")}"
                size="s"
              >
                <slot name="play-icon"><wa-icon library=${this.iconLibrary} name="play"></wa-icon></slot>
                <slot name="pause-icon"><wa-icon library=${this.iconLibrary} name="pause"></wa-icon></slot>
              </wa-button>
              <slot name="controls-after-play"></slot>

              <div class="mobile-time" part="time">
                ${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}
              </div>
              ${hasTimeline ? x`
                    <div
                      class="timeline"
                      part="timeline"
                      @mousemove=${this.handleTimelinePointerMove}
                      @touchmove=${this.handleTimelinePointerMove}
                      @mouseleave=${this.handleTimelineMouseLeave}
                      @touchend=${this.handleTimelineMouseLeave}
                    >
                      <wa-slider
                        exportparts="track: timeline-track, indicator: timeline-indicator, thumb: timeline-thumb"
                        min="0"
                        max="${this.duration || 100}"
                        step="0.1"
                        .value=${this.currentTime}
                        aria-label="${this.localize.term("seek")}"
                        aria-valuetext="${this.localize.term(
      "seekProgress",
      this.formatTime(this.currentTime),
      this.formatTime(this.duration)
    )}"
                        @input=${this.handleTimelineInput}
                        @change=${this.handleTimelineChange}
                      ></wa-slider>
                      ${this.showThumbnail && this.currentThumbnail ? x`
                            <div
                              class="timeline-thumbnail"
                              part="thumbnail"
                              style="left: ${this.thumbnailPosition}px; background-image: url(${this.currentThumbnail.url}); background-position: -${this.currentThumbnail.x}px -${this.currentThumbnail.y}px; width: ${this.currentThumbnail.w}px; height: ${this.currentThumbnail.h}px;"
                            ></div>
                          ` : E}
                    </div>
                  ` : x`<div class="spacer"></div>`}
            </div>
            <div>
              ${""}
              ${this.supportsVolumeControl && (!this.didSSR || this.didSSR && this.hasUpdated) ? x`
                    <wa-popover
                      for="volume-button"
                      placement="top"
                      distance="8"
                      ?open=${this.isVolumePopoverOpen}
                      @wa-hide=${this.handleVolumePopoverHide}
                      without-arrow
                    >
                      <div
                        class="volume-popover"
                        @mouseenter=${this.handleVolumePopoverEnter}
                        @mouseleave=${this.handleVolumePopoverLeave}
                      >
                        <wa-slider
                          orientation="vertical"
                          min="0"
                          max="100"
                          .value=${volumePercent}
                          @input=${this.handleVolumeSliderInput}
                          @change=${this.handleVolumeSliderChange}
                        ></wa-slider>
                        <div class="volume-label">${volumePercent}%</div>
                      </div>
                    </wa-popover>
                    <wa-button
                      id="volume-button"
                      aria-label=${this.localize.term("volume")}
                      size="s"
                      appearance="plain"
                      @mouseenter=${this.handleVolumeButtonEnter}
                      @click=${this.handleVolumeButtonClick}
                    >
                      <slot name="mute-icon"><wa-icon library=${this.iconLibrary} name="volume-xmark"></wa-icon></slot>
                      <slot name="volume-icon"
                        ><wa-icon
                          library=${this.iconLibrary}
                          name=${this.volume < 0.5 ? "volume-low" : "volume"}
                        ></wa-icon
                      ></slot>
                    </wa-button>
                  ` : x`
                    <wa-button
                      id="mute-button"
                      aria-label="${this.muted ? this.localize.term("unmute") : this.localize.term("mute")}"
                      size="s"
                      appearance="plain"
                      @click=${this.toggleMute}
                    >
                      <slot name="mute-icon"><wa-icon library=${this.iconLibrary} name="volume-xmark"></wa-icon></slot>
                      <slot name="volume-icon"><wa-icon library=${this.iconLibrary} name="volume"></wa-icon></slot>
                    </wa-button>
                  `}
              ${this.renderCaptionsDropdown()}
              ${this.isCompact ? this.controls === "full" ? this.renderCompactOverflowMenu() : x`
                      <wa-button
                        id="fullscreen-button"
                        @click="${this.toggleFullscreen}"
                        appearance="plain"
                        aria-label="${this.isFullscreen ? this.localize.term("exitFullscreen") : this.localize.term("enterFullscreen")}"
                        size="s"
                      >
                        <slot name="fullscreen-icon"
                          ><wa-icon library=${this.iconLibrary} name="expand"></wa-icon
                        ></slot>
                        <slot name="exit-fullscreen-icon"
                          ><wa-icon library=${this.iconLibrary} name="compress"></wa-icon
                        ></slot>
                      </wa-button>
                    ` : x`
                    ${this.controls === "full" ? x`
                          <wa-dropdown
                            placement="top"
                            distance="8"
                            @wa-select=${(e2) => this.handleSpeedSelect(parseFloat(e2.detail.item.value))}
                          >
                            <wa-button
                              id="speed-button"
                              slot="trigger"
                              appearance="plain"
                              aria-label=${this.localize.term("playbackSpeed")}
                              size="s"
                            >
                              <wa-icon library=${this.iconLibrary} name="gauge"></wa-icon>
                            </wa-button>
                            ${this.speedOptions.map(
      (option) => x`
                                <wa-dropdown-item
                                  type="checkbox"
                                  value="${option.value}"
                                  ?checked=${this.playbackRate === option.value}
                                  >${option.label}</wa-dropdown-item
                                >
                              `
    )}
                          </wa-dropdown>

                          <wa-button
                            id="pip-button"
                            @click="${this.togglePictureInPicture}"
                            appearance="plain"
                            aria-label=${this.localize.term("pictureInPicture")}
                            size="s"
                          >
                            <wa-icon name="picture-in-picture"></wa-icon>
                          </wa-button>
                        ` : E}

                    <wa-button
                      id="fullscreen-button"
                      @click="${this.toggleFullscreen}"
                      appearance="plain"
                      aria-label="${this.isFullscreen ? this.localize.term("exitFullscreen") : this.localize.term("enterFullscreen")}"
                      size="s"
                    >
                      <slot name="fullscreen-icon"><wa-icon library=${this.iconLibrary} name="expand"></wa-icon></slot>
                      <slot name="exit-fullscreen-icon"
                        ><wa-icon library=${this.iconLibrary} name="compress"></wa-icon
                      ></slot>
                    </wa-button>
                  `}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderMobileControls() {
    const pipAvailable = !!document.pictureInPictureEnabled;
    const speedLabel = this.playbackRate === 1 ? "1x" : `${this.playbackRate}x`;
    return x`
      <div class="mobile-controls-bar" part="controls-overlay">
        <div class="mobile-timeline-row">
          <div class="mobile-time" part="time">
            ${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}
          </div>
          <div
            class="timeline mobile-timeline"
            part="timeline"
            @touchmove=${this.handleTimelinePointerMove}
            @touchend=${this.handleTimelineMouseLeave}
          >
            <wa-slider
              min="0"
              max="${this.duration || 100}"
              step="0.1"
              .value=${this.currentTime}
              aria-label="${this.localize.term("seek")}"
              aria-valuetext="${this.localize.term(
      "seekProgress",
      this.formatTime(this.currentTime),
      this.formatTime(this.duration)
    )}"
              @input=${this.handleTimelineInput}
              @change=${this.handleTimelineChange}
            ></wa-slider>
          </div>
        </div>

        <div class="controls" part="controls">
          <div class="controls-group">
            <slot name="controls-start"></slot>
            <wa-button
              @click="${this.togglePlay}"
              appearance="plain"
              aria-label="${this.playing ? this.localize.term("pause") : this.localize.term("play")}"
              size="s"
            >
              <slot name="play-icon"><wa-icon library=${this.iconLibrary} name="play"></wa-icon></slot>
              <slot name="pause-icon"><wa-icon library=${this.iconLibrary} name="pause"></wa-icon></slot>
            </wa-button>
            <slot name="controls-after-play"></slot>
          </div>
          <div class="controls-group">
            <wa-button
              @click="${this.toggleMute}"
              appearance="plain"
              aria-label="${this.muted ? this.localize.term("unmute") : this.localize.term("mute")}"
              size="s"
            >
              <slot name="mute-icon"><wa-icon library=${this.iconLibrary} name="volume-xmark"></wa-icon></slot>
              <slot name="volume-icon"><wa-icon library=${this.iconLibrary} name="volume"></wa-icon></slot>
            </wa-button>
            ${this.renderCaptionsDropdown()}
            <wa-dropdown placement="top-end" distance="8" @wa-select=${this.handleMobileMenuSelect}>
              <wa-button slot="trigger" appearance="plain" size="s" aria-label="${this.localize.term("moreOptions")}">
                <wa-icon library=${this.iconLibrary} name="ellipsis-vertical"></wa-icon>
              </wa-button>
              <wa-dropdown-item>
                <wa-icon slot="icon" name="gauge"></wa-icon>
                ${this.localize.term("playbackSpeed")}
                <span slot="details">${speedLabel}</span>
                ${this.speedOptions.map(
      (option) => x`
                    <wa-dropdown-item
                      slot="submenu"
                      type="checkbox"
                      value="${option.value}"
                      ?checked=${this.playbackRate === option.value}
                    >
                      ${option.label}
                    </wa-dropdown-item>
                  `
    )}
              </wa-dropdown-item>
              ${pipAvailable ? x`
                    <wa-divider></wa-divider>
                    <wa-dropdown-item value="pip">
                      <wa-icon slot="icon" library=${this.iconLibrary} name="picture-in-picture"></wa-icon>
                      ${this.localize.term("pictureInPicture")}
                    </wa-dropdown-item>
                  ` : E}
            </wa-dropdown>
            <wa-button
              @click="${this.toggleFullscreen}"
              appearance="plain"
              aria-label="${this.isFullscreen ? this.localize.term("exitFullscreen") : this.localize.term("enterFullscreen")}"
              size="s"
            >
              <slot name="fullscreen-icon"><wa-icon library=${this.iconLibrary} name="expand"></wa-icon></slot>
              <slot name="exit-fullscreen-icon"><wa-icon library=${this.iconLibrary} name="compress"></wa-icon></slot>
            </wa-button>
          </div>
        </div>
      </div>
    `;
  }
  renderControls() {
    if (this.controls === "none") return E;
    return this.isMobile ? E : this.renderDesktopControls();
  }
  render() {
    return x`
      <div class="video-container" part="base">
        <div class="video-content">
          <div
            class="video-wrapper"
            data-paused="${!this.playing}"
            data-controls-visible="${this.controlsVisible}"
            ?data-mobile="${this.isMobile}"
            role="region"
            aria-label=${this.localize.term("videoPlayer")}
          >
            <video
              part="video"
              playsinline
              webkit-playsinline
              x-webkit-airplay="allow"
              preload=${this.preload}
              poster=${this.currentPoster || E}
              ?autoplay=${this.autoplay}
              ?loop=${this.loop}
              ?muted=${this.muted}
              @loadedmetadata=${this.handleLoadedMetadata}
              @timeupdate=${this.handleTimeUpdate}
              @play=${this.handlePlay}
              @pause=${this.handlePause}
              @volumechange=${this.handleVolumeChange}
              @ratechange=${this.handleRateChange}
              @seeking=${this.handleSeeking}
              @seeked=${this.handleSeeked}
              @error=${this.handleError}
              @ended=${this.handleVideoEnded}
              @click=${this.handleVideoClick}
              @webkitbeginfullscreen=${this.handleFullscreenChange}
              @webkitendfullscreen=${this.handleFullscreenChange}
            >
              ${this.sources.map((source) => x` <source src=${source.src} type=${source.type} /> `)}
              ${this.tracks.map(
      (track) => x`
                  <track src=${track.src} kind=${track.kind} srclang=${track.srclang} label=${track.label} />
                `
    )}
            </video>

            ${this.isMobile ? x`<div class="video-tap-overlay" @click=${this.handleVideoClick}></div>` : E}
            ${this.showPoster && this.currentPoster ? x`
                  <div
                    class="poster-overlay"
                    part="poster-overlay"
                    @click=${this.handlePosterClick}
                    style="background-image: url(${this.currentPoster})"
                  >
                    <div class="poster-play-button" part="poster-play-button">
                      <slot name="poster-icon" style="font-size: 2rem;">
                        <wa-icon library=${this.iconLibrary} name="play"></wa-icon>
                      </slot>
                    </div>
                  </div>
                ` : E}
            ${this.currentTitle ? x` <div class="video-title-overlay" part="video-title-overlay">${this.currentTitle}</div> ` : E}
            ${this.currentCaption ? x`
                  <div class="custom-caption-overlay" part="caption-overlay">
                    <div class="custom-caption" part="caption">
                      ${this.currentCaption.split("\n").map((line) => x`${line}<br />`)}
                    </div>
                  </div>
                  <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">${this.currentCaption}</div>
                ` : E}
            ${this.seekIndicator ? x`
                  <div class="seek-indicator seek-indicator--${this.seekIndicator}">
                    <wa-icon
                      library=${this.iconLibrary}
                      name=${this.seekIndicator === "backward" ? "backward" : "forward"}
                    ></wa-icon>
                    <span>${this.seekIndicator === "backward" ? "\u221210s" : "+10s"}</span>
                  </div>
                ` : E}
            ${this.renderControls()}
          </div>

          ${this.controls !== "none" && this.isMobile ? this.renderMobileControls() : E}
        </div>

        <slot @slotchange=${this.handleSlotChange} style="display: none;"></slot>
      </div>
    `;
  }
};
WaVideo.css = video_styles_default;
__decorateClass([
  e("video")
], WaVideo.prototype, "videoElement", 2);
__decorateClass([
  e(".timeline")
], WaVideo.prototype, "timelineElement", 2);
__decorateClass([
  e("slot:not([name])")
], WaVideo.prototype, "slotElement", 2);
__decorateClass([
  r()
], WaVideo.prototype, "showPoster", 2);
__decorateClass([
  r()
], WaVideo.prototype, "playbackRate", 2);
__decorateClass([
  r()
], WaVideo.prototype, "controlsVisible", 2);
__decorateClass([
  r()
], WaVideo.prototype, "isVolumePopoverOpen", 2);
__decorateClass([
  r()
], WaVideo.prototype, "seekIndicator", 2);
__decorateClass([
  r()
], WaVideo.prototype, "currentPoster", 2);
__decorateClass([
  r()
], WaVideo.prototype, "currentTitle", 2);
__decorateClass([
  r()
], WaVideo.prototype, "showCaptions", 2);
__decorateClass([
  r()
], WaVideo.prototype, "availableCaptions", 2);
__decorateClass([
  r()
], WaVideo.prototype, "currentCaptionIndex", 2);
__decorateClass([
  r()
], WaVideo.prototype, "customCaptions", 2);
__decorateClass([
  r()
], WaVideo.prototype, "currentCaption", 2);
__decorateClass([
  r()
], WaVideo.prototype, "thumbnailData", 2);
__decorateClass([
  r()
], WaVideo.prototype, "showThumbnail", 2);
__decorateClass([
  r()
], WaVideo.prototype, "thumbnailPosition", 2);
__decorateClass([
  r()
], WaVideo.prototype, "currentThumbnail", 2);
__decorateClass([
  r()
], WaVideo.prototype, "isMobile", 2);
__decorateClass([
  r()
], WaVideo.prototype, "isCompact", 2);
__decorateClass([
  n({ reflect: true })
], WaVideo.prototype, "controls", 2);
__decorateClass([
  n({ type: String })
], WaVideo.prototype, "thumbnails", 2);
__decorateClass([
  n({ type: String })
], WaVideo.prototype, "src", 2);
__decorateClass([
  n({ type: String })
], WaVideo.prototype, "poster", 2);
__decorateClass([
  n({ type: String })
], WaVideo.prototype, "title", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaVideo.prototype, "playing", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaVideo.prototype, "muted", 2);
__decorateClass([
  n({ type: Number })
], WaVideo.prototype, "volume", 2);
__decorateClass([
  n({ type: Number })
], WaVideo.prototype, "duration", 2);
__decorateClass([
  n({ type: Number })
], WaVideo.prototype, "currentTime", 2);
__decorateClass([
  n({ type: Boolean })
], WaVideo.prototype, "autoplay", 2);
__decorateClass([
  n({ type: Boolean })
], WaVideo.prototype, "loop", 2);
__decorateClass([
  n({ type: Boolean, attribute: "autoplay-muted" })
], WaVideo.prototype, "autoplayMuted", 2);
__decorateClass([
  n({ type: Boolean, attribute: "autoplay-on-visible" })
], WaVideo.prototype, "autoplayOnVisible", 2);
__decorateClass([
  n({ type: String })
], WaVideo.prototype, "preload", 2);
__decorateClass([
  n({ attribute: "icon-library" })
], WaVideo.prototype, "iconLibrary", 2);
WaVideo = __decorateClass([
  t("wa-video")
], WaVideo);
var mediaSessionOwner = null;

export {
  WaVideo
};
