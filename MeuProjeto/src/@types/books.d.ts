export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    language?: string; // <--- Adicione esta linha
    imageLinks?: {
      thumbnail: string;
      medium?: string;
    };
  };
}