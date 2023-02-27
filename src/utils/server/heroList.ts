import { cloudBucket } from '@/utils/server';
import { Hero, Mission } from '@/models/index';

export const deleteProfile = (profileImage: string) => {
  cloudBucket.file(profileImage).delete();
};

export const deleteHero = async (id: string) => {
  const hero = await Hero.findById(id);
  deleteProfile(hero.profileImage);

  Hero.findOneAndDelete({ _id: id }).exec();
  Mission.findOneAndDelete({ authorId: id }).exec();
  Mission.updateMany({}, { $pull: { receivers: id } }).exec();
};
