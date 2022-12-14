type MissionStatus = 'create' | 'update' | 'complete';

interface Mission {
  id: string;
  groupId: string;
  authorId: string;
  maxReceiver: number;
  receivers: string[];
  title: string;
  description: string;
  isComplete: boolean;
}

type MissionList = Mission[];
