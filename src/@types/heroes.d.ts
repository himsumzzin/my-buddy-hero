interface HeroInfo {
  groupId: string;
  name: string;
  title: string;
  description: string;
  code: string;
  profileImage: string;
}

interface Hero extends HeroInfo {
  id: string;
  completeNumber: number;
}

type HeroList = Hero[];
