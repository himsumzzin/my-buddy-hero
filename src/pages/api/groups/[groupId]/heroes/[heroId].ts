import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/utils/server';
import { Hero, Mission } from '@/models/index';

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

      const hero = {
        id: result._id,
        name: result.name,
        title: result.title,
        profileImage: result.profileImage,
        completeNumber: result.completeNumber,
        groupId: result.groupId,
        description: result.description,
        code: result.code,
      };

      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
          hero,
        },
      });
    } else if (method === 'PATCH') {
      Hero.findOneAndUpdate(
        { _id: req.query.heroId },
        { $set: { ...req.body } }
      ).exec();

      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
        },
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
