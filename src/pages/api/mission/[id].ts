import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Mission, Hero } from '@/models/index';

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
      const result = await Mission.find({ groupId: req.query.id }).exec();
      const data = result.map((result) => ({
        id: result._id,
        authorId: result.authorId,
        receivers: result.receivers,
        title: result.title,
        description: result.description,
        maxReceiver: result.maxReceiver,
        isComplete: result.isComplete,
      }));
      console.log(data);
      return res.status(200).json({
        statusCode: 200,
        body: {
          success: true,
          data,
        },
      });
    } else if (method === 'PATCH') {
      const result = await Mission.findById(req.query.id).exec();
      // 임무 수락
      if (req.body.receiver) {
        Mission.update(
          { _id: result._id },
          { $push: { receivers: req.body.receiver } }
        ).exec();
      }
      // 임무 완료
      else if (req.body.receivers) {
        Mission.update({ _id: result._id }, { isComplete: true }).exec();
        req.body.receivers.map(async (receiverId: string) => {
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
