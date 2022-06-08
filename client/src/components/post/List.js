import React, { useState, useEffect } from "react";
import { ListDiv, ListItem } from "../../style/ListCSS";
import { Link } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ListDiv>
      {postList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/detail/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};
export default List;
