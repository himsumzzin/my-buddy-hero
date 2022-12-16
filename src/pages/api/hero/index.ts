import { format } from 'util';
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect, cloudBucket } from '@/utils/server';
import { Hero } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
    hero?: IHero;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method !== 'POST') return;

  await dbConnect();
  try {
    const payload = req.body;

    const [, imageContentType] = payload.profileImage.split(/;|:/g);
    const base64 = payload.profileImage.split(',')[1];
    const imageBuffer = Buffer.from(base64, 'base64');

    // 이름과 옵션을 받아 스토리지에 빈 파일 객체를 생성한다
    const blob = cloudBucket.file(
      `${crypto.randomUUID().slice(0, 8)}_${payload.groupId}_${payload.name}`
    );

    // createWriteStream함수로 스토리지에 있는 파일 객체에 데이터를 덮어쓴다.
    // bucket.file.createWriteStream의 반환값은 이벤트를 발생시킬 수 있는 객체다
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: imageContentType,
      },
    });

    // 파일 전송중 에러가 발생하면 트리거된다
    blobStream.on('error', (err) => {
      throw new Error(err);
    });
    // 파일 전송이 끝나면 트리거된다
    blobStream.on('finish', () => {
      const profileImage = format(
        `https://storage.googleapis.com/${cloudBucket.name}/${blob.name}`
      );

      const hero = new Hero({ ...payload, profileImage });
      hero.save();
      const { _id, name, title, groupId, code, description, completeNumber } =
        hero._doc;

      return res.status(201).json({
        statusCode: 201,
        body: {
          success: true,
          hero: {
            id: _id,
            name,
            title,
            groupId,
            code,
            description,
            completeNumber,
            profileImage,
          },
        },
      });
    });
    // 전송할 파일의 chunk를 넣어준다
    // buffer처럼 쪼개서 보낼 수 있는 녀석들을 넣어준다
    blobStream.end(imageBuffer);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      err,
      body: {
        success: false,
      },
    });
  }
}
