import React, {useEffect, useState, useContext} from "react";
import AuthContext from "./auth";
import exampleposts from "../assets/exampleposts.json";




function PageContent(props) {
  
    if (props.navSelection == "about") {
      return <AboutContent />
    } else if (props.navSelection == "home") {
      return <HomeContent />
    } else {
        return <p>routing error</p>
    }
  }
  

  function AboutContent() {
    return <p>about page!!!</p>;
  }
  



  function HomeContent() {
    const { isAuthenticated, futura_actor } = useContext(AuthContext);

    const [showNewPost, setShowNewPost] = useState(false);

    // TODO: give the HR element a box-shadow with some css so it looks 3D

    return (
      <>
        {isAuthenticated && (
          <><button
            onClick={() => {
              setShowNewPost(!showNewPost);
            }}
          >
            I DO NOTHING!
          </button>
          {String(showNewPost)}
          <hr />
          </>
        )}
        {/* {isAuthenticated ? <NewPost /> : <div />} */}
        {exampleposts.map((post) => (
          <SinglePost
            key={post.id}
            title={post.title}
            author={post.author}
            content={post.content}
          />
        ))}
      </>
    );
  }
  
  
  
  function SinglePost(props) {
    return (
      <div className="row">
        <h4>{props.title}</h4>
        <h6>{props.author}</h6>
        <p>{props.content}</p>
        <hr />
      </div>
    );
  }
  
  function NewPost(props) {
    return (
      <>
      <form>
        <div className="row">
        <label htmlFor="title">Title</label>
        <input className="u-full-width" type="text" id="newPostContent" />
        <label htmlFor="exampleMessage">Content</label>
        <textarea className="u-full-width" placeholder="" id="newPostContent"></textarea>
        <input type="submit" value="Submit" />
        </div>
      </form>
      <hr />
      </>
    )
  }
  
  export default PageContent;