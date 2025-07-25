export type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  image_url?: string;
  stacks: { id: number; name: string; image_url: string }[];
};
