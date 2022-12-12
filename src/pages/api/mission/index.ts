import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import Mission from '@/models/Mission';

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
  const mission = new Mission(req.body);
  mission
    .save()
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
}
