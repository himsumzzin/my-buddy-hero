import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/utils/server';
import { Mission } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
    missions?: MissionList;
    mission?: Mission;
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
      const result = await Mission.find({ groupId: req.query.groupId }).exec();
      const missions = result.map((result) => ({
        id: result._id,
        authorId: result.authorId,
        receivers: result.receivers,
        title: result.title,
        description: result.description,
        maxReceiver: result.maxReceiver,
        isComplete: result.isComplete,
        groupId: result.groupId,
      }));
      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
          missions,
        },
      });
    } else if (method === 'POST') {
      const mission = new Mission({ ...req.body, groupId: req.query.groupId });
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
