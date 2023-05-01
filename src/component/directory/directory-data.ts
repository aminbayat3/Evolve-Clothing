import { Key } from "react";

export type DirectoryCategory = {
  id: Key,
  title: string;
  imageUrl: string;
  route: string;
  size?: string;
}

export const DIRECTORY_DATA: DirectoryCategory[] = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/rKPz1nW/hats.jpg",
      "route": 'shop/hats'
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/m8K7wkM/Jackets.jpg",
      "route": 'shop/jackets'
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/dQx21MC/sneakers.jpg",
      "route": 'shop/sneakers'
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/t40TRHc/Women1.jpg",
      "route": 'shop/womens',
      "size": "large"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/K9dHr7X/men.jpg",
      "route": 'shop/mens',
      "size": "large"
    }
  ];