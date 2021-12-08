import { AudioContext } from 'web-audio-api';

/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });

  const leftData = buffer.getChannelData(0);
  const rightData = buffer.getChannelData(1);
  const dataLen = leftData.length;
  const chunksLen = Math.ceil(dataLen / 100);
  let peaks = []; let max = 0;
  let tmp = 0; let count = 0;
  for (let i = 0; i < dataLen; i++) {
    // 絶対値の平均をとる
    tmp += (Math.abs(leftData[i]) + Math.abs(rightData[i])) / 2
    count++;
    // チャンクサイズに達した場合、peaksにpeakを追加する
    if (count === chunksLen) {
      const peak = tmp/chunksLen
      peaks.push(peak)
      max = Math.max(max, peak)
      tmp = 0; count = 0;
    }
  }

  return { max, peaks };
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} buffer
 */

/**
 * @type {React.VFC<Props>}
 */
async function generateSoundWaveSVG(soundData) {
  const { peaks, max } = await calculate(soundData);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">
      ${peaks.map((peak, i) => {
        const ratio = peak / max;
        return `<rect key="${i}" fill="#2563EB" height="${ratio}" width="1" x="${i}" y="${1 - ratio}" />`;
      })}
    </svg>
  `.trim();
};

export { generateSoundWaveSVG };
