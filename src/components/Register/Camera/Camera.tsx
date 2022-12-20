/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import styles from './Camera.module.css';
import { Button, Dialog } from '@/components/common';
import { CSSProperties, useRef, useState } from 'react';
import { getToonifyImage } from '@/apis/toonify';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ArrowLeft from '@svgs/arrow-left.svg';
import { debounce } from 'lodash';
import { useCallback } from 'react';

export const Camera = (props: any) => {
  const TIMER_DELAY = 5;
  const { handlerRegisterPage, saveHeroInfo } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isFirstClick, setIsFirstClick] = useState(true);
  const [countdown, setCountdown] = useState(TIMER_DELAY);
  const [imgURL, setImgURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

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

    setLoading(true);
    getToonifyPhoto();
  };

  const getToonifyPhoto = () => {
    if (!canvasRef.current) return;
    let selectProfileImage = '';

    // 캔버스에 현재 이미지 blob으로 만들기
    canvasRef.current.toBlob(
      async (blobData) => {
        try {
          // 1. formdata 객체 생성
          // 2. formdata에 blob데이터 이미지 형식으로 붙여주기
          // 3. getToonifyImage api로 이미지 변환!
          // 4. imgURL 상태 새로추가
          const data: any = new FormData();

          if (!blobData) {
            throw new Error('blobData가 null입니다');
          }

          data.append('image', blobData);
          selectProfileImage = await getToonifyImage(data, 'emojify');

          // 1. 캔버스에 뿌려주기 위한 이미지 객체 생성
          // 2. 이미지객체가 onload 된 시점(확실하게 만들어진 시점)에 캔버스에 그려준다
          const transImage = new Image();
          transImage.onload = () => {
            const canvas = canvasRef.current?.getContext(
              '2d'
            ) as CanvasRenderingContext2D;
            canvas.drawImage(transImage, 0, 0, 522, 430);
            setLoading(false);
          };

          // 이미지가 로드된 이후 img의 src에 url 넣어주기!
          transImage.src = `data:image/webp;base64,${selectProfileImage}`;
          setImgURL(selectProfileImage);
        } catch {
          setModal(true);
          setLoading(false);
        }
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
    setIsFirstClick(false);
    setDevice();
    countDownAndTakeAPicture();
  };

  const retakeThePictureHandler = () => {
    if (isFirstClick) return;
    setCountdown(TIMER_DELAY);
    countDownAndTakeAPicture();
  };

  const override: CSSProperties = {
    display: 'block',
    marginLeft: '30%',
    borderColor: 'green',
  };

  const isBtnDisable =
    loading || (countdown && countdown < TIMER_DELAY) || isFirstClick;

  const closeModal = () => {
    setModal(false);
    setCountdown(TIMER_DELAY);
  };

  return (
    <div className={`${styles.container}`}>
      {modal ? (
        <Dialog modal={true} onClose={closeModal}>
          <Dialog.Body className={styles.modal}>
            얼굴이 잘 보이게 촬영해주세요
          </Dialog.Body>
          <Dialog.Footer onClose={closeModal}></Dialog.Footer>
        </Dialog>
      ) : null}
      <Button
        size="xs"
        onClick={handlerRegisterPage}
        disabled={loading}
        className={styles.backBtn}
      >
        <ArrowLeft width="32px" height="32px" viewBox="0 0 24 24"></ArrowLeft>
      </Button>
      <div className={styles.view}>
        <div
          className={`${styles.blindBoard} ${
            isFirstClick ? '' : styles.hidden
          }`}
          onClick={takeAPictureOnlyOnceHandler}
          aria-hidden="true"
        >
          <p className={styles.blindBoardTitle}>히어로 사진 찍기</p>
          <p className={styles.blindBoardIcon}>+</p>
        </div>
        <div
          className={`${styles.countdownBoard} ${
            countdown === 0 ? styles.hidden : styles.show
          }`}
        >
          <div className={styles.countdownInnerContainer}>
            <p className={styles.countdownTitle}>화면에 얼굴을 맞춰주세요</p>
            <p className={styles.countdownNumber}>{countdown}</p>
          </div>
        </div>
        <div className={loading ? styles.loader : ''}>
          <PacmanLoader
            color={'#fffae5'}
            cssOverride={override}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <video
          muted
          className={styles.video}
          ref={videoRef}
          autoPlay
          width="522"
          height="430"
        ></video>
        <div className={styles.canvasContainer}>
          <canvas
            className={`${styles.canvas} ${
              countdown === 0 ? styles.show : styles.hidden
            }`}
            ref={canvasRef}
            width={522}
            height={430}
          ></canvas>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          size="md"
          onClick={debounce(() => {
            retakeThePictureHandler();
          }, 1000)}
          disabled={isBtnDisable}
          className={styles.button}
        >
          다시 찍기
        </Button>
        <Button
          size="md"
          onClick={debounce(() => {
            saveHeroInfo(imgURL);
          }, 1000)}
          disabled={isBtnDisable}
          className={styles.button}
        >
          완료
        </Button>
      </div>
    </div>
  );
};
