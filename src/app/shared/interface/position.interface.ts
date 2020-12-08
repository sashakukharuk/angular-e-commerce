interface ImgSmall {
  img: string;
}

export interface PositionType {
  _id: string;
  imgMain: string;
  imgLarge: string;
  imgSmall: Array<ImgSmall>;
  name: string;
  price: number;
  size: string;
  overview: string;
  categoryId: string;
  quantity: number;
}

