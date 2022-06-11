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
        author: Text;
        // postdate: Time.Time; // Nanoseconds since 1970
        // lastedited: Time.Time;
        content: Text;
        // tags: List.List<Text>;
        // bid: Nat64;
        // tip: Nat64;
    };

    public type UserInfo = {
        pseudonym: Text;
        bio: Text;
    };

    
    // data storage

    //    store a collection of posts
    //    posts can be accessed by author, by postdate, or by tags
    //    should this be marked stable?
    //    we may never know! Only triemaps can be stable i guess
    private /*stable?*/ var DB = Map.HashMap<Principal, PostList>(10, Principal.equal, Principal.hash); 
    private var users = Map.HashMap<Principal, UserInfo>(10, Principal.equal, Principal.hash);



    
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
        switch (users.get(caller)) {
            case (null) Principal.toText(caller);
            case (?result) result.pseudonym;
        };
    };

    
    // update_pseudonym
    //     checks to make sure user is logged in, updates the user's pen name
    public shared ({caller}) func update_pseudonym(pseudonym: Text) : async Bool {
        assert not Principal.isAnonymous(caller);

        switch (users.get(caller)) {
            case (null) {
                let userInfo : UserInfo = {
                    pseudonym = pseudonym;
                    bio = "";
                    };
                users.put(caller, userInfo);
                return true;
            };
            case (?result) {
                let userInfo : UserInfo = {
                    pseudonym = pseudonym;
                    bio = result.bio;
                };
                users.put(caller, userInfo);
                return true;
            };
        };
    };


    // get_bio
    //     returns a user's bio message
    public shared query ({caller}) func get_bio() : async Text {
        if (Principal.isAnonymous(caller)) {return "";};
        switch (users.get(caller)) {
            case (null) "";
            case (?result) result.bio;
        };
    };


    // update_bio
    //     checks to make sure user is logged in, updates the user's bio
    public shared ({caller}) func update_bio(bio: Text) : async Bool {
        assert not Principal.isAnonymous(caller);

        switch (users.get(caller)) {
            case (null) {
                let userInfo : UserInfo = {
                    pseudonym = "UNDEFINED";
                    bio = bio;
                    };
                users.put(caller, userInfo);
                return true;
            };
            case (?result) {
                let userInfo : UserInfo = {
                    pseudonym = result.pseudonym;
                    bio = bio;
                };
                users.put(caller, userInfo);
                return true;
            };
        };
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
            author = Principal.toText(caller);
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
