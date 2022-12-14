/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import styles from './Camera.module.css';
import { Button } from '@/components/common';
import { useRef, useState } from 'react';

export const Camera = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isFirstClick, setIsFirstClick] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const setDevice = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });

    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const takePhoto = () => {
    const canvas = canvasRef.current?.getContext('2d');
    canvas?.scale(-1, 1);
    canvas?.translate(-522, 0);
    canvas?.drawImage(videoRef.current, 0, 0, 522, 430);

    canvas?.scale(-1, 1);
    canvas?.translate(-522, 0);
  };

  const savePhoto = () => {
    console.log(canvasRef.current?.toDataURL('image/webp', 0.8));
  };

  const countDownAndTakeAPicture = () => {
    const setCount = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(setCount);
          takePhoto();
        }
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => {
      takePhoto();
      setIsCounting(false);
    }, 3000);
  };

  const handlerPlayPicture = () => {
    setIsFirstClick(true);
    setDevice();
    countDownAndTakeAPicture();
  };

  const handlerReplayPicture = () => {
    if (!isFirstClick) return;
    setIsCounting(true);
    setCountdown(3);
    countDownAndTakeAPicture();
  };

  const handlerSavePhoto = () => {
    if (!isFirstClick) return;
    savePhoto();
  };

  return (
    <div className={styles.container}>
      <div className={styles.view}>
        <div
          className={`${styles.cameraTextContainer} ${
            isFirstClick ? styles.hidden : ''
          }`}
          onClick={handlerPlayPicture}
          aria-hidden="true"
        >
          <p className={styles.cameraTitle}>히어로 사진 찍기</p>
          <p className={styles.plusText}>+</p>
        </div>
        <div
          className={`${styles.countdownContainer} ${
            countdown === 0 ? styles.hidden : styles.show
          }`}
        >
          <div className={styles.innerBorder}>
            <p className={styles.countdownText}>화면에 얼굴을 맞춰주세요</p>
            <p className={styles.countdownNumber}>{countdown}</p>
          </div>
        </div>
        <video
          muted
          className={styles.video}
          ref={videoRef}
          autoPlay
          width="522"
          height="430"
        ></video>
        <canvas
          className={`${styles.canvas} ${
            isCounting ? styles.hidden : styles.show
          }`}
          ref={canvasRef}
          width="522"
          height="430"
        ></canvas>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          size="md"
          onClick={handlerReplayPicture}
          disabled={isCounting ? true : false}
        >
          다시 찍기
        </Button>
        <Button
          size="md"
          onClick={handlerSavePhoto}
          disabled={isCounting ? true : false}
        >
          완료
        </Button>
      </div>
    </div>
  );
};
