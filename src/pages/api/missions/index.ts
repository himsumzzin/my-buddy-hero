import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/utils/server';
import { Mission } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
    mission?: IMission;
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
    const mission = new Mission(req.body);
    mission.save();
    const {
      _id,
      groupId,
      authorId,
      maxReceiver,
      receivers,
      title,
      description,
      isComplete,
    } = mission._doc;
    return res.status(201).json({
      statusCode: 201,
      body: {
        success: true,
        mission: {
          id: _id,
          groupId,
          authorId,
          maxReceiver,
          receivers,
          title,
          description,
          isComplete,
        },
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
