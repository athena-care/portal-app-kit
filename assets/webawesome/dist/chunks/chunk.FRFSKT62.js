/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/video-playlist/video-playlist.styles.ts
import { css } from "lit";
var video_playlist_styles_default = css`
  :host {
    display: block;
    max-width: 100%;
  }

  .video-playlist {
    display: flex;
    flex-direction: column;
    container-type: inline-size;
    container-name: video-playlist;
    background-color: var(--wa-color-surface-default);
  }

  .video-playlist__player {
    /* Ensure slotted wa-video fills width */
    ::slotted(wa-video) {
      width: 100%;
    }
  }

  /* Playlist sidebar */
  .playlist {
    background: var(--wa-color-fill-quiet);
    color: var(--wa-color-text-normal);
    padding: var(--wa-space-m);
    overflow-y: auto;

    h3 {
      margin: 0 0 var(--wa-space-xs) 0;
      font-size: var(--wa-font-size-m);
      font-weight: 600;
    }
  }

  .playlist-items {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-xs);
  }

  .playlist-item {
    display: grid;
    grid-template-columns: 30% 1fr;
    align-items: start;
    gap: var(--wa-space-xs);
    padding: 0.5em;
    border-radius: var(--wa-border-radius-s);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);

    @container video-playlist (max-width: 480px) {
      grid-template-columns: 20% 1fr;
    }

    @media (hover: hover) {
      &:hover {
        background: var(--wa-color-neutral-fill-normal);
      }
    }

    &.active {
      background: var(--wa-color-neutral-fill-normal);

      .playlist-item-info {
        font-weight: 800;
      }
    }
  }

  .playlist-thumbnail,
  .playlist-thumbnail-placeholder {
    width: 100%;
    object-fit: cover;
    border-radius: var(--wa-border-radius-s);
    flex-shrink: 0;
    aspect-ratio: 16 / 9;
  }

  .playlist-thumbnail-placeholder {
    background: var(--wa-color-fill-quiet);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-2xl);
    color: var(--wa-color-text-quiet);

    wa-icon {
      width: 2rem;
      height: 2rem;
    }
  }

  .playlist-item-info {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .playlist-item-content {
    flex: 1;
  }

  .playlist-item-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--wa-font-size-s);
  }

  .playlist-item-duration {
    font-size: var(--wa-font-size-xs);
    color: var(--wa-color-text-normal);
  }

  div.playlist-item {
    box-sizing: border-box;
    width: 100%;
  }
`;

export {
  video_playlist_styles_default
};
