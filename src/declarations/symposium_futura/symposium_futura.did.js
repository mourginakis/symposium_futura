export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get_all_posts' : IDL.Func([], [IDL.Bool], ['query']),
    'get_pseudonym' : IDL.Func([], [IDL.Text], ['query']),
    'make_post' : IDL.Func([], [], []),
    'update_pseudonym' : IDL.Func([IDL.Text], [], []),
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
