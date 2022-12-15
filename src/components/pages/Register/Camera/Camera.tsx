/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import styles from './Camera.module.css';
import { Button } from '@/components/common';
import { useRef, useState } from 'react';
import axios from 'axios';
import { getToonifyImage } from '@/apis/toonify';

export const Camera = (props: any) => {
  const {
    handlerRegisterPage,
    handlerCompletePage,
    setHeroInfoPayload,
    heroPayload,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isFirstClick, setIsFirstClick] = useState(false);
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
    if (!videoRef.current) return; //추가로 넣음
    const canvas = canvasRef.current?.getContext('2d');
    canvas?.scale(-1, 1);
    canvas?.translate(-522, 0);
    canvas?.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current?.videoWidth * 0.85,
      videoRef.current?.videoHeight * 0.85
    );

    canvas?.scale(-1, 1);
    canvas?.translate(-522, 0);
    getToonifyPhoto();
  };

  const savePhoto = async () => {
    try {
      await axios
        .post('/api/hero', heroPayload)
        .then((res) => {
          console.log(heroPayload);
          console.log('서버에 저장을 성공해써요!');
        })
        .catch((error) => {
          console.error('서버전송에 실패했습니다. 다시 히어로 등록을 해주세요');
        });
    } catch (err) {
      console.error('히어로 정보가 제대로 전송되지 않았습니다.');
    }
  };

  const getToonifyPhoto = () => {
    if (!canvasRef.current) return;
    let selectProfileImage = '';

    // 캔버스에 현재 이미지 blob으로 만들기
    canvasRef.current.toBlob(
      async (blobData) => {
        // 1. formdata 객체 생성
        // 2. formdata에 blob데이터 이미지 형식으로 붙여주기
        // 3. getToonifyImage api로 이미지 변환!
        const data: FormData = new FormData();
        data.append('image', blobData);
        selectProfileImage = await getToonifyImage(data, 'toonifyplus');

        // 1. 캔버스에 뿌려주기 위한 이미지 객체 생성
        // 2. 이미지객체가 onload 된 시점(확실하게 만들어진 시점)에 캔버스에 그려준다
        const transImage = new Image();
        transImage.onload = () => {
          const canvas = canvasRef.current?.getContext('2d');
          canvas.drawImage(transImage, 0, 0, 500, 420);
        };

        // 이미지가 로드된 이후 img의 src에 url 넣어주기!
        transImage.src = `data:image/webp;base64,${selectProfileImage}`;
        setHeroInfoPayload(`data:image/webp;base64,${selectProfileImage}`);
      },
      'image/webp',
      0.8
    );
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
  };

  const takeAPictureOnlyOnceHandler = () => {
    setIsFirstClick(true);
    setDevice();
    countDownAndTakeAPicture();
  };

  const retakeThePictureHandler = () => {
    if (!isFirstClick) return;
    setCountdown(3);
    countDownAndTakeAPicture();
  };

  const savePhotoHandler = () => {
    if (!isFirstClick) return;
    savePhoto();
  };

  return (
    <div className={`${styles.container}`}>
      <Button size="xs" onClick={handlerRegisterPage} disabled={false}>
        🔙
      </Button>
      <div className={styles.view}>
        <div
          className={`${styles.cameraTextContainer} ${
            isFirstClick ? styles.hidden : ''
          }`}
          onClick={takeAPictureOnlyOnceHandler}
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
            countdown === 0 ? styles.show : styles.hidden
          }`}
          ref={canvasRef}
          width={videoRef.current?.videoWidth}
          height={videoRef.current?.videoHeight}
        ></canvas>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          size="md"
          onClick={retakeThePictureHandler}
          disabled={countdown !== 0 ? true : false}
          className={styles.button}
        >
          다시 찍기
        </Button>
        <Button
          size="md"
          onClick={() => {
            savePhotoHandler();
            handlerCompletePage();
          }}
          disabled={countdown !== 0 ? true : false}
          className={styles.button}
        >
          완료
        </Button>
      </div>
    </div>
  );
};
