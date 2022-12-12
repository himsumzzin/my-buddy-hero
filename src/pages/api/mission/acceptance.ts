import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Mission } from '@/models/index';

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
  if (method !== 'POST') return;
  await dbConnect();

  try {
    const result = await Mission.findById(req.body.missionId).exec();
    Mission.update(
      { _id: result._id },
      { $push: { receivers: req.body.receiver } }
    ).exec();
    return res.status(201).json({
      statusCode: 201,
      body: {
        success: true,
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
