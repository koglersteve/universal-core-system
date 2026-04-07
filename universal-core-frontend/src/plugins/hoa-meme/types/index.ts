// src/plugins/hoa-meme/types/index.ts

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
}

export interface MemeEditState {
  topText: string;
  bottomText: string;
}
