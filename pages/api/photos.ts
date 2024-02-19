import type { NextApiRequest, NextApiResponse } from 'next';

type Photo = {
  id: number;
  url: string;
  likes: number;
  comments: number;
};

type User = {
  username: string;
  postCount: number;
  avatarUrl: string;
};

const user: User = {
  username: 'johndoe',
  postCount: 42,
  avatarUrl: 'https://picsum.photos/id/1/128/128',
};

const photos: Photo[] = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/id/${i + 1}/300/300`,
  likes: Math.floor(Math.random() * 1000), 
  comments: Math.floor(Math.random() * 100), 
}));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: User; photos: Photo[] }>
) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const perPage = 9;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  console.log('startIndex', startIndex);
  console.log('endIndex', endIndex);
  
  const photosToSend = photos.slice(startIndex, endIndex);

  res.status(200).json({ user, photos: photosToSend });
}
