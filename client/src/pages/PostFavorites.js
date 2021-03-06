import React, { useEffect, useState } from "react";
import { CollectionItem, Collection } from "../Components/CollectionList";
import DeleteBtn from "../Components/DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FAVORITE, LOADING, UPDATE_FAVORITES } from "../utils/actions";
import Nav from "../Components/Nav/index";
import Wrapper from "../Components/Wrapper/index";
import { Container, Row } from "../Components/Grid/index";
import ls from "local-storage";
import API from "../../src/utils/API/userApi";
import likeAPI from "../../src/utils/API/linklikeAPI"




const PostFavorites = () => {

  // const getFavorites = () => {
  //   dispatch({ type: LOADING });
  //   dispatch({ type: UPDATE_FAVORITES });
  // };
  const [favorites, setFavorites] = useState([])
  const removeFromFavorites = id => {
    likeAPI.deleteLinkLike(id)
      .then(() => {
        console.log("remove success!")
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    let getFavorites = () => {
      // dispatch({ type: LOADING });
      let user = ls.get('username');
      API.getUser(user)
        .then(results => {
          setFavorites(results.data[0].linklikes)
          console.log(results.data[0].linklikes)
        })
        .catch(err => console.log(err));
    };
    getFavorites();
    console.log(favorites)
  }, []);

  return (
    <>
    <Nav />
    <Wrapper style={{ overflow: "auto" }}>
    <Container>
      <Row>
        <div className=" col s12 m12 l12">
          <div className="card black">
      <h1 id="header-style" style={{ textAlign: "center", color: "#7289da", padding: "10px" }}>Here's All of Your Favorite Posts</h1>
      </div>
      {favorites.length ? (
        <Collection>
          <h3 style={{ textAlign: "center", color: "#7289da"}}>Click on a post to view in detail</h3>
          {favorites.map(post => (
            <CollectionItem key={post._id} id="post-style">
                <div className="card small black" >
                    <div className="card-stacked">
                        <div className="card-content" id="card-body">
                            <DeleteBtn onClick={() => removeFromFavorites(post._id)} />
                            <h4 style={{ marginTop: "0px", color: "#7289da"}}>{post.header}</h4>
                            <br />
                            q/ <span style={{ color: "orange" }}>{post.category}</span> 
                            <br />
                 <span> •</span> <span style={{ color: "darkGrey", fontSize: "12px"}}>
                Posted by: <span style={{ color: "purple", fontWeight: "bold"}}>{post.username}</span>
                </span> 
                <div className="card-action">
                    <Link to={"/posts/" + post._id}>
                    <strong style={{color: "#7289da"}}>
                Click here to open post </strong>
              </Link> 
              <br />
              <br />
              <a href={post.link} target="_blank">
                <p href={post.link}>Link</p>
              </a>

                </div>
                        </div>
                    </div>
                </div>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <h3>You haven't added any favorites yet!</h3>
      )}
      <div style={{ height: "37vh"}}>
      <Link to="/Members">Back to home</Link>
      </div>
    </div>
    </Row>
    </Container>
    </Wrapper>
    </>
  );
};

export default PostFavorites;
