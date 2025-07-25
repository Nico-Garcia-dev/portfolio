export type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  image_url?: string;
  stack: { id: number; name: string; url: string }[];
};
