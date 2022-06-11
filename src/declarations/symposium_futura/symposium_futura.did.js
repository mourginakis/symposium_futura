export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const Post = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'author' : IDL.Text,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(Post, List_1)));
  const PostList = IDL.Opt(IDL.Tuple(Post, List_1));
  List.fill(IDL.Opt(IDL.Tuple(PostList, List)));
  return IDL.Service({
    'add_post' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'get_all_posts' : IDL.Func([], [List], ['query']),
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
