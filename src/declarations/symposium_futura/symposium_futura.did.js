export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'add_post' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'get_all_posts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'get_bio' : IDL.Func([], [IDL.Text], ['query']),
    'get_pseudonym' : IDL.Func([], [IDL.Text], ['query']),
    'update_bio' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'update_pseudonym' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'wallet_balance' : IDL.Func([], [IDL.Nat], []),
    'wallet_receive' : IDL.Func(
        [],
        [IDL.Record({ 'accepted' : IDL.Nat64 })],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
