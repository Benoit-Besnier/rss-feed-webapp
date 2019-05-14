import { Feed } from "./Feed";
import { Link } from "./Link";
import { Person } from "./Person";
import { Category } from "./Category";

export interface Entry {
  id: number;
  feed: Feed;
  link: string;
  authors: Person[];
  categories: Category[];
  comments: string;
  contributors: Person[];
  links: Link;
  publishedDate: Date;
  updatedDate: Date;
  title: string;
  uri: string;
}
