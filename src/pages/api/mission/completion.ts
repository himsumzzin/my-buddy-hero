import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Hero, Mission } from '@/models/index';

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
  if (method !== 'POST') return;

  try {
    const result = await Mission.findById(req.body.missionId).exec();
    Mission.update({ _id: result._id }, { isComplete: true }).exec();

    req.body.receivers.map(async (receiverId: string) => {
      const result = await Hero.findById(receiverId).exec();
      Hero.update(
        { _id: result._id },
        { completeNumber: result.completeNumber + 1 }
      ).exec();
    });

    return res.status(201).json({
      statusCode: 201,
      body: {
        success: true,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      err,
      body: {
        success: false,
      },
    });
  }
}
