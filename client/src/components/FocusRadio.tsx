import {
  ExternalLink,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  focusPlaylists,
  type FocusMoodId,
} from "@/data/focusRadioPlaylists";
import { useLanguage } from "@/contexts/LanguageContext";
import "./FocusRadio.css";

const MOOD_STORAGE_KEY = "slp-focus-radio-mood";
const VOLUME_STORAGE_KEY = "slp-focus-radio-volume";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function getInitialMood(): FocusMoodId {
  if (typeof window === "undefined") return "lofi";
  const stored = window.localStorage.getItem(MOOD_STORAGE_KEY);
  return focusPlaylists.some(playlist => playlist.id === stored)
    ? (stored as FocusMoodId)
    : "lofi";
}

function getInitialVolume() {
  if (typeof window === "undefined") return 0.72;
  const stored = Number(window.localStorage.getItem(VOLUME_STORAGE_KEY));
  return Number.isFinite(stored) && stored >= 0 && stored <= 1 ? stored : 0.72;
}

export default function FocusRadio() {
  const { language } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [moodId, setMoodId] = useState<FocusMoodId>(getInitialMood);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(getInitialVolume);

  const playlist = useMemo(
    () => focusPlaylists.find(item => item.id === moodId) ?? focusPlaylists[0],
    [moodId]
  );
  const track = playlist.tracks[trackIndex];
  const hasTracks = playlist.tracks.length > 0;

  useEffect(() => {
    window.localStorage.setItem(MOOD_STORAGE_KEY, moodId);
  }, [moodId]);

  useEffect(() => {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    setTrackIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    audioRef.current?.pause();
  }, [moodId]);

  useEffect(() => {
    if (!track || !audioRef.current) return;
    audioRef.current.load();
  }, [track]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const selectTrack = (direction: -1 | 1) => {
    if (!hasTracks) return;
    const nextIndex =
      (trackIndex + direction + playlist.tracks.length) % playlist.tracks.length;
    setTrackIndex(nextIndex);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const seek = (value: number) => {
    if (!audioRef.current || !track) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <section
      className="focus-radio-section"
      aria-labelledby="focus-radio-heading"
      id="focus-radio"
    >
      <div className="focus-radio-intro">
        <p className="resources-eyebrow">02 / Focus Radio</p>
        <h2 id="focus-radio-heading">
          {language === "en" ? "Focus" : "Modo"}
          <br />
          <em>{language === "en" ? "mode." : "enfoque."}</em>
        </h2>
        <p>
          {language === "en"
            ? "Music for getting something done."
            : "Música para avanzar con lo que importa."}
        </p>
      </div>

      <div className="focus-radio-tool">
        <div
          className="focus-moods"
          role="radiogroup"
          aria-label={language === "en" ? "Select a mood" : "Elegir un mood"}
        >
          {focusPlaylists.map(item => (
            <button
              type="button"
              role="radio"
              aria-checked={moodId === item.id}
              className={moodId === item.id ? "is-active" : ""}
              onClick={() => setMoodId(item.id)}
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="focus-player">
          <div className="focus-player-status">
            <span>{language === "en" ? "Now playing" : "Reproduciendo"}</span>
            <span>{playlist.name}</span>
          </div>

          <div className="focus-track-copy" aria-live="polite">
            {track ? (
              <>
                <h3>{track.title}</h3>
                <p>{track.artist}</p>
              </>
            ) : (
              <>
                <h3>
                  {language === "en"
                    ? "Audio curation in progress"
                    : "Audio en proceso de curaduría"}
                </h3>
                <p>
                  {language === "en"
                    ? "Only verified CC0 and CC BY 4.0 tracks will play here."
                    : "Acá solo sonarán pistas CC0 y CC BY 4.0 verificadas."}
                </p>
              </>
            )}
          </div>

          <div className="focus-waveform" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <i
                className={isPlaying ? "is-playing" : ""}
                style={{ "--wave-index": index } as React.CSSProperties}
                key={index}
              />
            ))}
          </div>

          <div className="focus-controls">
            <button
              type="button"
              onClick={() => selectTrack(-1)}
              disabled={!hasTracks}
              aria-label={language === "en" ? "Previous track" : "Pista anterior"}
            >
              <SkipBack aria-hidden="true" />
            </button>
            <button
              type="button"
              className="focus-play-button"
              onClick={togglePlayback}
              disabled={!track}
              aria-label={
                isPlaying
                  ? language === "en"
                    ? "Pause"
                    : "Pausar"
                  : language === "en"
                    ? "Play"
                    : "Reproducir"
              }
            >
              {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => selectTrack(1)}
              disabled={!hasTracks}
              aria-label={language === "en" ? "Next track" : "Pista siguiente"}
            >
              <SkipForward aria-hidden="true" />
            </button>
          </div>

          <div className="focus-progress-row">
            <span>{formatTime(currentTime)}</span>
            <label>
              <span className="sr-only">
                {language === "en" ? "Track progress" : "Progreso de la pista"}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                onChange={event => seek(Number(event.target.value))}
                disabled={!track}
                aria-label={language === "en" ? "Track progress" : "Progreso de la pista"}
              />
            </label>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="focus-player-bottom">
            <span className="focus-genre">{playlist.name}</span>
            <label className="focus-volume">
              {volume > 0.5 ? <Volume2 aria-hidden="true" /> : <Volume1 aria-hidden="true" />}
              <span className="sr-only">
                {language === "en" ? "Volume" : "Volumen"}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={event => setVolume(Number(event.target.value))}
                aria-label={language === "en" ? "Volume" : "Volumen"}
              />
            </label>
          </div>

          {track && (
            <audio
              ref={audioRef}
              src={track.src}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
              onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
              onEnded={() => selectTrack(1)}
            />
          )}
        </div>

        <div className="focus-license">
          <span>{language === "en" ? "License / credit" : "Licencia / crédito"}</span>
          {track ? (
            <div>
              <p>{track.attribution}</p>
              <p>
                <a href={track.licenseUrl} target="_blank" rel="noreferrer">
                  {track.license}
                </a>{" "}
                · {track.duration}
              </p>
              <a href={track.sourceUrl} target="_blank" rel="noreferrer">
                {language === "en" ? "Source" : "Fuente"}
                <ExternalLink aria-hidden="true" />
              </a>
            </div>
          ) : (
            <p>
              {language === "en"
                ? "No unverified audio has been published."
                : "No publicamos audio sin verificar."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
