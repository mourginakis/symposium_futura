import React, {useEffect, useState, useContext} from "react";
import AuthContext from "./auth";
import exampleposts from "../assets/exampleposts.json";


function PageContent(props) {
    const {isAuthenticated, futura_actor} = useContext(AuthContext);
  
    if (props.navSelection == "about") {
      return (
        <div className="main" id="maincontent">
          <div className="container">
            <p>about page!!!</p>
          </div>
        </div>
      );
    } else {
      // home
      return (
        <div className="main" id="maincontent">
          <div className="container">
            {isAuthenticated ? <NewPost /> : <div />}
            {exampleposts.map((post) => (
              <SinglePost
                key={post.id}
                title={post.title}
                author={post.author}
                content={post.content}
              />
            ))}
          </div>
        </div>
      );
    }
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