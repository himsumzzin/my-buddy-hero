import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect, cloudBucket, deleteProfile } from '@/utils/server';
import { Hero } from '@/models/index';
import { format } from 'util';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
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
      const { heroId } = req.query;
      const result = await Hero.findById(heroId);

      const hero = { ...result, id: result._id };

      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
          hero,
        },
      });
    } else if (method === 'PATCH') {
      const { id, name, profileImage: base64Image } = req.body;

      const prevHero = await Hero.findById<Hero>(id);
      prevHero && deleteProfile(prevHero.profileImage);

      const imageBuffer = Buffer.from(base64Image, 'base64');

      const fileName = `${crypto.randomUUID().slice(0, 8)}_${
        req.query.groupId
      }_${name}`;

      const blob = cloudBucket.file(fileName);
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

      blobStream.on('finish', async () => {
        const profileImage = format(
          `https://storage.googleapis.com/${cloudBucket.name}/${blob.name}`
        );

        const hero = { ...req.body, profileImage };

        Hero.findOneAndUpdate({ _id: req.query.heroId }, { $set: hero }).exec();

        return res.status(200).json({
          statusCode: 200,
          body: {
            success: true,
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
