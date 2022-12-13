interface Hero {
  _id: string;
  groupId: string;
  name: string;
  code: string;
  password: string;
  profileImage: string;
  missionCount: number;
  description: string;
}

type HeroList = hero[];
