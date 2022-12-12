import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Hero } from '@/models/index';

type Data = {
  statusCode: number;
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

  if (method === 'GET') {
    Hero.find({ groupId: req.query.id })
      .exec()
      .then((results) => {
        const data = results.map((result) => ({
          heroId: result._id,
          name: result.name,
          title: result.title,
          completeNumber: result.completeNumber,
        }));

        return res.status(200).json({
          statusCode: 200,
          body: {
            success: true,
            data,
          },
        });
      })
      .catch(() => {
        return res.status(500).json({
          statusCode: 500,
          body: {
            success: false,
          },
        });
      });
  } else if (method === 'DELETE') {
    Hero.findOneAndDelete({ _id: req.query.id })
      .exec()
      .then(() => {
        return res.status(200).json({
          statusCode: 200,
          body: {
            success: true,
          },
        });
      })
      .catch(() => {
        return res.status(500).json({
          statusCode: 500,
          body: {
            success: false,
          },
        });
      });
  }
}
