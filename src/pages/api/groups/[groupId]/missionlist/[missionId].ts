import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/utils/server';
import { Mission, Hero } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
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
      const { missionId } = req.query;
      const result = await Mission.findById(missionId);
      const mission = {
        id: result._id,
        authorId: result.authorId,
        receivers: result.receivers,
        title: result.title,
        description: result.description,
        maxReceiver: result.maxReceiver,
        isComplete: result.isComplete,
        groupId: result.groupId,
      };

      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
          mission,
        },
      });
    } else if (method === 'PATCH') {
      const { receiver, receivers } = req.body;

      const result = await Mission.findById(req.query.missionId).exec();
      // 임무 수락
      if (receiver) {
        Mission.update(
          { _id: result._id },
          { $push: { receivers: receiver } }
        ).exec();
      }
      // 임무 완료
      else if (receivers) {
        Mission.update({ _id: result._id }, { isComplete: true }).exec();
        receivers.map(async (receiverId: string) => {
          const result = await Hero.findById(receiverId).exec();
          Hero.update(
            { _id: result._id },
            { completeNumber: result.completeNumber + 1 }
          ).exec();
        });
      }
      return res.status(201).json({
        statusCode: 201,
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
