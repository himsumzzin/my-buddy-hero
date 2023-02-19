interface Hero {
  id: string;
  groupId: string;
  name: string;
  title: string;
  description: string;
  code: string;
  profileImage: string;
  completeNumber: number;
}

type HeroList = Hero[];
