import { Storage } from '@google-cloud/storage';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME as string;

const cloudStorage = new Storage({
  projectId,
});

const getServiceAccount = async () => {
  const [serviceAccount] = await cloudStorage.getServiceAccount();
  console.log(
    `The GCS service account for project ${projectId} is: ${serviceAccount.emailAddress}`
  );
};
getServiceAccount().catch(console.error);

export const cloudBucket = cloudStorage.bucket(bucketName);
