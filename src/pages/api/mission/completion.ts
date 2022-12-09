import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Mission from '../../../models/Mission';
import Hero from '../../../models/Hero';

type Data = {
  statusCode: number;
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
  Mission.findById(req.body.missionId)
    .exec()
    .then((result) => {
      return Mission.update({ _id: result._id }, { isComplete: true }).exec();
    })
    .then(() => {
      return res.status(201).json({
        statusCode: 201,
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

  req.body.receivers.map((receiverId: string) => {
    Hero.findById(receiverId)
      .exec()
      .then((result) => {
        return Hero.update(
          { _id: result._id },
          { completeNumber: result.completeNumber + 1 }
        ).exec();
      });
  });
}
