import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/utils/server';
import { Hero } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
    data?: unknown[];
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
      const result = await Hero.find({ groupId: req.query.id }).exec();

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
    } else if (method === 'DELETE') {
      Hero.findOneAndDelete({ _id: req.query.id }).exec();
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
