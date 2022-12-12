import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import Mission from '@/models/Mission';

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
  if (method !== 'GET') return;

  await dbConnect();
  Mission.find({ groupId: req.query.id })
    .exec()
    .then((results) => {
      const data = results.map((result) => ({
        missionId: result._id,
        author: result.author,
        receiver: result.receiver,
        title: result.title,
        description: result.description,
        maxReceiver: result.maxReceiver,
        isComplete: result.isComplete,
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
}
