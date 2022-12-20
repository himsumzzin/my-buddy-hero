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
    data?: unknown[];
    hero?: Hero;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await dbConnect();

  try {
    if (method === 'GET') {
      const result = await Hero.find({ groupId: req.query.groupId }).exec();

      const data = result.map((result) => ({
        id: result._id,
        name: result.name,
        title: result.title,
        profileImage: result.profileImage,
        completeNumber: result.completeNumber,
        groupId: result.groupId,
        description: result.description,
        code: result.code,
      }));

      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
          data,
        },
      });
    } else if (method === 'POST') {
      const { name, profileImage: base64Image } = req.body;
      const imageBuffer = Buffer.from(base64Image, 'base64');

      const fileName = `${crypto.randomUUID().slice(0, 8)}_${
        req.query.groupId
      }_${name}`;

      const blob = cloudBucket.file(fileName);

      // createWriteStream함수로 스토리지에 있는 파일 객체에 데이터를 덮어쓴다.
      // bucket.file.createWriteStream의 반환값은 이벤트를 발생시킬 수 있는 객체다
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: 'image/webp',
        },
      });

      blobStream.write(imageBuffer, () => {
        blobStream.end();
      });

      blobStream.on('error', (err: any) => {
        throw new Error(err);
      });

      blobStream.on('finish', () => {
        const profileImage = format(
          `https://storage.googleapis.com/${cloudBucket.name}/${blob.name}`
        );

        const hero = new Hero({
          ...req.body,
          profileImage,
          groupId: req.query.groupId,
        });
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
    }
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
