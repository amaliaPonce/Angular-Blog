export interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author_id: number;
  image_url: string;
}

export interface ArticleResponse {
  articles: Article[];
  totalCount?: number;
}

export interface ArticleCreationData {
  title: string;
  content: string;
  author_id: number;
  category_id: number;
  image_url: string;
  imageFile: File;
}
