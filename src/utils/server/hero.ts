import { cloudBucket } from '@/utils/server';
import { Hero, Mission } from '@/models/index';

// export const createHero = async (hero:Hero) => {

// }

export const deleteHero = async (id: string) => {
  const hero = await Hero.findById(id);
  const { profileImage } = hero;
  cloudBucket.file(profileImage).delete();

  Hero.findOneAndDelete({ _id: id }).exec();
  Mission.findOneAndDelete({ authorId: id }).exec();
  Mission.updateMany({}, { $pull: { receivers: id } }).exec();
};
