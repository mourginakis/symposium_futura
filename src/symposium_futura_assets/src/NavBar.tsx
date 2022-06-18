function NavBar(props) {
    return (
      <nav id="nav">
        <a href="#" onClick={() => props.navSelection("home")}>
          <div className="logotitle">
            <img src="img/cypher/cypher_logo_static.jpg" alt="cypher" />
            {/* <img src="img/generic_quill.png" alt="quill"/> */}
            {/* <video autoPlay loop>
              <source src="img/cypher/cool_cypher_encoded.webm" type="video/webm"></source>
            </video> */}
            <div>
              <h2>SYMPOSIUM FUTURA</h2>
              <p>community knowledge engine</p>
            </div>
          </div>
        </a>
        <div className="about">
          <a href="#" onClick={() => props.navSelection("about")}>
            <h5>about</h5>
          </a>
        </div>
        <div className="console">
          <a href="#" onClick={() => props.navSelection("console")}>
            <h5>console</h5>
          </a>
        </div>
      </nav>
    );
  }

  export default NavBar;