import { classNames } from '../../../utils/classnames';
import React, { useRef } from "react";

import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  /**
   * @type {React.MutableRefObject<HTMLVideoElement>}
   */
  const animatorRef = useRef(null);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = React.useState(!prefersReducedMotion);
  const handleClick = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        animatorRef.current?.pause();
      } else {
        animatorRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video
          ref={animatorRef}
          muted
          autoPlay={!prefersReducedMotion}
          src={src}
          loop
          playsInline
          className="w-full"
        />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            isPlaying ? 'opacity-0 group-hover:opacity-100' : '',
          )}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay } />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
