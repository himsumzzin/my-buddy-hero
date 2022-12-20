import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/utils/server';
import { Hero } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await dbConnect();

  try {
    if (method === 'DELETE') {
      Hero.findOneAndDelete({ _id: req.query.heroId }).exec();
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
