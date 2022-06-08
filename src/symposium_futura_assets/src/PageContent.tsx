import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./auth";
import exampleposts from "../assets/exampleposts.json";

import AboutContent from "./AboutContent";




function PageContent(props) {
  if (props.navSelection == "about") {
    return <AboutContent />;
  } else if (props.navSelection == "home") {
    return <HomeContent />;
  } else if (props.navSelection == "console") {
    return <p>in development</p>;
  } else {
    return <p>routing error</p>;
  }
}






function HomeContent() {
  const { isAuthenticated, futura_actor } = useContext(AuthContext);

  const [showNewPost, setShowNewPost] = useState(false);

  // TODO: give the HR element a box-shadow with some css so it looks 3D

  return (
    <>
      {isAuthenticated && (
        <>
          <button
            onClick={() => {
              setShowNewPost(!showNewPost);
            }}
            style={
              showNewPost
                ? { width: "150px", boxShadow: "0.5px 0.5px inset" }
                : { width: "150px" }
            }
          >
            AUTHOR NEW
          </button>
          <div className={showNewPost ? "dropdown-active" : "dropdown"}>
            <NewPostForm />
          </div>
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



function NewPostForm(props) {
  const {isAuthenticated, futura_actor} = useContext(AuthContext);
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("waiting");

    const myresult = await futura_actor?.add_post(title, content);
    if (myresult == true) {
        setResult("success");
        console.log("worked!")
    }
    //console.log(String(result))

    // alert("You have submitted the form. " + title + content);
  };

  if (result == "waiting...") {
    return (
        <div style={{backgroundColor: "gray"}}>submitting</div>
        // <div style={{textAlign: "center"}}>
        // <video style={{width: "200px", textAlign: "center"}} autoPlay loop>
        //     <source src="img/cypher/cool_cypher_encoded.webm" type="video/webm"></source>
        // </video>
        // </div>
        // <p>submitting</p>
    );
  } else if (result == "success") {
      return <div style={{backgroundColor: "lightgreen"}}>Success!</div>;
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              className="u-full-width"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="exampleMessage">Content</label>
            <textarea
              className="u-full-width"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div style={{ textAlign: "right" }}>
              <input type="submit" className="submitpost" value="Submit" />
              <p>
                this site is still in alpha. please backup your posts manually.
              </p>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default PageContent;
