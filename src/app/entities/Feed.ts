import { Entry } from "./Entry";
import { Link } from "./Link";
import { Person } from "./Person";
import { Category } from "./Category";

export interface Feed {
  uuid: string;
  title: string;
  link: string;
  sourceFeedUrl: string;
  copyright: string;
  description: string;
  authors: Person[];
  categories: Category[];
  contributors: Person[];
  encoding: string;
  entries: Entry[];
  feedType: string;
  generator: string;
  language: string;
  links: Link[];
  publishedDate: Date;
  styleSheet: string;
  uri: string;
  webMaster: string;
  autoUpdatedDate: Date;
}
