/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaVideoChangeEvent
} from "./chunk.RSLQSBEZ.js";
import {
  video_playlist_styles_default
} from "./chunk.FRFSKT62.js";
import {
  WebAwesomeElement
} from "./chunk.SPMLOO35.js";
import {
  LocalizeController
} from "./chunk.I5ZKJLBU.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/video-playlist/video-playlist.ts
import { html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
var WaVideoPlaylist = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.activeIndex = 0;
    this.items = [];
    this.metadataHandlers = /* @__PURE__ */ new Map();
    this.controls = "full";
    this.iconLibrary = "system";
    this.endedHandler = () => {
      const videos = this.getVideoElements();
      const nextIndex = this.activeIndex + 1;
      if (nextIndex < videos.length) {
        this.goTo(nextIndex);
        videos[nextIndex].play();
      }
    };
  }
  // ─── Private helpers ─────────────────────────────────────────────────────────
  getVideoElements() {
    if (!this.defaultSlot) return [];
    return this.defaultSlot.assignedElements({ flatten: true }).filter((el) => el.tagName.toLowerCase() === "wa-video");
  }
  syncItems() {
    const videos = this.getVideoElements();
    const promises = [];
    videos.forEach((v) => {
      if (v.didSSR && !v.hasUpdated) {
        promises.push(v.updateComplete);
      }
    });
    if (promises.length > 0) {
      Promise.allSettled(promises).then(() => this.syncItems());
      return;
    }
    this.items = videos.map((v) => ({
      title: v.title || "",
      poster: v.poster || "",
      duration: v.duration || 0
    }));
    videos.forEach((v, i) => {
      v.controls = this.controls;
      v.hidden = i !== this.activeIndex;
    });
    this.syncNavButtons(videos);
    this.attachEndedListener();
    this.syncMetadataListeners(videos);
  }
  syncMetadataListeners(videos) {
    this.metadataHandlers.forEach((handler, video) => video.removeEventListener("loadedmetadata", handler));
    this.metadataHandlers.clear();
    videos.forEach((v, i) => {
      if (!v.duration) {
        const handler = () => {
          this.items = this.items.map((item, idx) => idx === i ? { ...item, duration: v.duration } : item);
          this.metadataHandlers.delete(v);
        };
        this.metadataHandlers.set(v, handler);
        v.addEventListener("loadedmetadata", handler, { once: true });
      }
    });
  }
  syncNavButtons(videos = this.getVideoElements()) {
    if (videos.length < 2) return;
    videos.forEach((v) => {
      v.querySelectorAll("[data-wa-playlist-nav]").forEach((el) => el.remove());
    });
    const active = videos[this.activeIndex];
    if (!active) return;
    const prev = document.createElement("wa-button");
    prev.setAttribute("slot", "controls-start");
    prev.setAttribute("appearance", "plain");
    prev.setAttribute("size", "s");
    prev.setAttribute("data-wa-playlist-nav", "prev");
    prev.setAttribute("aria-label", this.localize.term("previousVideo"));
    if (this.activeIndex === 0) prev.setAttribute("disabled", "");
    prev.innerHTML = `<wa-icon library="${this.iconLibrary}" name="backward-step"></wa-icon>`;
    prev.addEventListener("click", () => this.previous());
    const next = document.createElement("wa-button");
    next.setAttribute("slot", "controls-after-play");
    next.setAttribute("appearance", "plain");
    next.setAttribute("size", "s");
    next.setAttribute("data-wa-playlist-nav", "next");
    next.setAttribute("aria-label", this.localize.term("nextVideo"));
    if (this.activeIndex === videos.length - 1) next.setAttribute("disabled", "");
    next.innerHTML = `<wa-icon library="${this.iconLibrary}" name="forward-step"></wa-icon>`;
    next.addEventListener("click", () => this.next());
    active.appendChild(prev);
    active.appendChild(next);
  }
  attachEndedListener() {
    const videos = this.getVideoElements();
    videos.forEach((v) => v.removeEventListener("ended", this.endedHandler));
    if (videos[this.activeIndex]) {
      videos[this.activeIndex].addEventListener("ended", this.endedHandler);
    }
  }
  // ─── Public API ──────────────────────────────────────────────────────────────
  /** Plays the next video in the playlist. */
  next() {
    const videos = this.getVideoElements();
    if (this.activeIndex < videos.length - 1) {
      videos[this.activeIndex]?.pause();
      this.goTo(this.activeIndex + 1);
    }
  }
  /** Plays the previous video in the playlist. */
  previous() {
    if (this.activeIndex > 0) {
      const videos = this.getVideoElements();
      videos[this.activeIndex]?.pause();
      this.goTo(this.activeIndex - 1);
    }
  }
  /** Jumps to the video at the given index. */
  goTo(index) {
    const videos = this.getVideoElements();
    if (index < 0 || index >= videos.length) return;
    const previousIndex = this.activeIndex;
    this.activeIndex = index;
    videos.forEach((v, i) => {
      v.hidden = i !== index;
    });
    this.syncNavButtons(videos);
    this.attachEndedListener();
    this.dispatchEvent(
      new WaVideoChangeEvent({
        previousIndex,
        currentIndex: index,
        video: {
          title: videos[index].title,
          poster: videos[index].poster,
          sources: [],
          tracks: []
        }
      })
    );
  }
  // ─── Lifecycle ───────────────────────────────────────────────────────────────
  disconnectedCallback() {
    super.disconnectedCallback();
    const videos = this.getVideoElements();
    videos.forEach((v) => {
      v.removeEventListener("ended", this.endedHandler);
      v.querySelectorAll("[data-wa-playlist-nav]").forEach((el) => el.remove());
    });
    this.metadataHandlers.forEach((handler, video) => video.removeEventListener("loadedmetadata", handler));
    this.metadataHandlers.clear();
  }
  // ─── Event handlers ──────────────────────────────────────────────────────────
  handleSlotChange() {
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => this.handleSlotChange());
      return;
    }
    this.syncItems();
  }
  handlePlaylistItemClick(index) {
    this.getVideoElements()[this.activeIndex]?.pause();
    this.goTo(index);
  }
  // ─── Render ──────────────────────────────────────────────────────────────────
  formatDuration(seconds) {
    if (!seconds) return "";
    const s = Math.floor(seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = String(s % 60).padStart(2, "0");
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
  }
  render() {
    return html`
      <div class="video-playlist" part="base">
        <div class="video-playlist__player">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        ${this.items.length > 1 ? html`
              <div class="playlist" part="playlist">
                <h3 id="playlist-label">${this.localize.term("playlist")}</h3>
                <div class="playlist-items" role="listbox" aria-labelledby="playlist-label">
                  ${this.items.map(
      (item, index) => html`
                      <div
                        class="playlist-item ${index === this.activeIndex ? "active" : ""}"
                        part="playlist-item"
                        role="option"
                        tabindex="${index === this.activeIndex ? "0" : "-1"}"
                        aria-selected="${index === this.activeIndex ? "true" : "false"}"
                        aria-label="${item.title}${index === this.activeIndex ? ", " + this.localize.term("currentlyPlaying") : ""}"
                        @click=${() => this.handlePlaylistItemClick(index)}
                        @keydown=${(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handlePlaylistItemClick(index);
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          e.currentTarget.nextElementSibling?.focus();
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          e.currentTarget.previousElementSibling?.focus();
        }
      }}
                      >
                        ${item.poster ? html`
                              <img
                                src=${item.poster}
                                alt=${item.title}
                                class="playlist-thumbnail"
                                part="playlist-thumbnail"
                              />
                            ` : html`
                              <div class="playlist-thumbnail-placeholder">
                                <wa-icon library=${this.iconLibrary} name="play"></wa-icon>
                              </div>
                            `}
                        <div class="playlist-item-info">
                          <div class="playlist-item-content">
                            <div class="playlist-item-title" part="playlist-title">${item.title}</div>
                            ${item.duration ? html`
                                  <div class="playlist-item-duration" part="playlist-duration">
                                    ${this.formatDuration(item.duration)}
                                  </div>
                                ` : nothing}
                          </div>
                        </div>
                      </div>
                    `
    )}
                </div>
              </div>
            ` : nothing}
      </div>
    `;
  }
};
WaVideoPlaylist.css = video_playlist_styles_default;
__decorateClass([
  query("slot:not([name])")
], WaVideoPlaylist.prototype, "defaultSlot", 2);
__decorateClass([
  state()
], WaVideoPlaylist.prototype, "activeIndex", 2);
__decorateClass([
  state()
], WaVideoPlaylist.prototype, "items", 2);
__decorateClass([
  property({ reflect: true })
], WaVideoPlaylist.prototype, "controls", 2);
__decorateClass([
  property({ attribute: "icon-library" })
], WaVideoPlaylist.prototype, "iconLibrary", 2);
WaVideoPlaylist = __decorateClass([
  customElement("wa-video-playlist")
], WaVideoPlaylist);

export {
  WaVideoPlaylist
};
