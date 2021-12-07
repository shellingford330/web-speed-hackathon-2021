import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  return (
    <img
      alt={alt}
      className="relative w-full h-full overflow-hidden object-cover"
      src={src}
    />
  );
};

export { CoveredImage };
