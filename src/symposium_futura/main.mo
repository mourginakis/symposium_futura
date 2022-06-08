import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

import Cycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";



actor {

    // PRELIM ---------------------
    // ----------------------------
    // ----------------------------

    // type definitions
    type Pseudonym = Text;
    public type PostList = List.List<Post>;

    public type Post = {
        title: Text;
        author: Principal;
        // postdate: Time.Time; // Nanoseconds since 1970
        // lastedited: Time.Time;
        content: Text;
        // tags: List.List<Text>;
    };

    
    // data storage

    //    store a collection of posts
    //    posts can be accessed by author, by postdate, or by tags
    //    should this be marked stable?
    //    we may never know! Only triemaps can be stable i guess
    private /*stable?*/ var DB = Map.HashMap<Principal, PostList>(10, Principal.equal, Principal.hash); 
    private var pseudonyms = Map.HashMap<Principal, Text>(10, Principal.equal, Principal.hash);

    private var simplemap = Map.HashMap<Text, Text>(10, Text.equal, Text.hash);



    
    // PSEUDONYMS -----------------
    // ----------------------------
    // ----------------------------
    /* __INTERFACE__
       public shared query ({caller}) func get_pseudonym() : async Text {}
       
       public shared ({caller}) func update_pseudonym(pseudonym: Text) : async () {}
     */

    
    // get_pseudonym
    //    returns 'ANONYMOUS' for users not logged in
    //    returns the user's pseudonym, or, if null, returns the Principal ID.
    public shared query ({caller}) func get_pseudonym() : async Text {
        if (Principal.isAnonymous(caller)) {return "ANONYMOUS";};
        switch (pseudonyms.get(caller)) {
            case (null) "YOU";
            case (?result) result;
        }
    };

    
    // update_pseudonym
    //     checks to make sure user is logged in, updates the user's pen name
    public shared ({caller}) func update_pseudonym(pseudonym: Text) : async () {
        assert not Principal.isAnonymous(caller);
        pseudonyms.put(caller, pseudonym);
    };




    // BLOG -----------------------
    // ----------------------------
    // ----------------------------
    /* __INTERFACE__
       public query func get_all_posts() : async () {}
       public query func get_all_posts_by_author() : async () {}
       public shared ({caller}) func make_post() : async Bool {}
       public shared ({caller}) func delete_post() : async Bool {}
       public shared ({caller}) func edit_post() : async Bool {}
     */

    // add_post
    //   adds a post object to the PostList object indexed by the DB hashmap, by author
    public shared ({caller}) func add_post(title: Text, content: Text) : async Bool {
        // assert not Principal.isAnonymous(caller);

        let newPost : Post = {
            title = title;
            author = caller;
            content = content;
        };

        let userPosts : List.List<Post> = Option.get(DB.get(caller), List.nil<Post>());
        DB.put(caller, List.push(newPost, userPosts));
        true
    };


    
    // get_all_posts
    //   gets a list of all post objects
    public query func get_all_posts() : async List.List<PostList> {
        //DB.vals(); //.toArray();
        // Iter.toList(simplemap.vals())
        Iter.toList(DB.vals())
        
    };

    





    // UITLS & DEBUG --------------
    // ----------------------------
    // ----------------------------
    let limit = 10_000_000;

    // wallet_balance
    public func wallet_balance() : async Nat {
        return Cycles.balance();
    };

    // wallet_recieve
    public func wallet_receive() : async { accepted: Nat64 } {
        let available = Cycles.available();
        let accepted = Cycles.accept(Nat.min(available, limit));
        { accepted = Nat64.fromNat(accepted) };
    };

    // whomai
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };

};
