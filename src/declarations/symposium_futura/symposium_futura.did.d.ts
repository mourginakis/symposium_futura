import type { Principal } from '@dfinity/principal';
export type List = [] | [[PostList, List]];
export type List_1 = [] | [[Post, List_1]];
export interface Post {
  'title' : string,
  'content' : string,
  'author' : string,
}
export type PostList = [] | [[Post, List_1]];
export interface _SERVICE {
  'add_post' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'get_all_posts' : () => Promise<List>,
  'get_bio' : () => Promise<string>,
  'get_pseudonym' : () => Promise<string>,
  'update_bio' : (arg_0: string) => Promise<boolean>,
  'update_pseudonym' : (arg_0: string) => Promise<boolean>,
  'wallet_balance' : () => Promise<bigint>,
  'wallet_receive' : () => Promise<{ 'accepted' : bigint }>,
  'whoami' : () => Promise<Principal>,
}
