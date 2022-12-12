import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Mission } from '@/models/index';

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
  if (method !== 'GET') return;
  await dbConnect();

  try {
    const result = await Mission.find({ groupId: req.query.id }).exec();
    const data = result.map((result) => ({
      missionId: result._id,
      authorId: result.authorId,
      receivers: result.receivers,
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
