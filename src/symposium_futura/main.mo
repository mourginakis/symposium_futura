actor {
    
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    public shared (msg) func whoami() : async Principal {
        msg.caller
    };
    
};
