import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'get_all_posts' : () => Promise<boolean>,
  'get_pseudonym' : () => Promise<string>,
  'make_post' : () => Promise<undefined>,
  'update_pseudonym' : (arg_0: string) => Promise<undefined>,
  'wallet_balance' : () => Promise<bigint>,
  'wallet_receive' : () => Promise<{ 'accepted' : bigint }>,
  'whoami' : () => Promise<Principal>,
}
