import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { withRouter, useHistory } from "react-router";
import AlertComponent from "../container-components/AlertComponent";

const PostListComponent = ({ id, title, content, postList, setPostList }) => {
  const history = useHistory();

  const deletePost = async () => {
    try {
      const response = await axios.delete(`/api/post/${id}`);

      if (response) {
        // success toast and filter state

        const prevList = postList.filter((item) => {
          return item._id != id;
        });

        //success Alert
        AlertComponent.success("Post Deleted Successfully");

        // console.log(prevList);
        setPostList(prevList);
      }
    } catch (error) {
      // Todo - error Toast
      AlertComponent.error("Some Error Occured");
    }
  };
  return (
    <div className="container">
      <Card style={{ width: "100%", marginBottom: "16px" }}>
        <Card.Body>
          <Card.Title>Title : {title}</Card.Title>

          <Card.Text>Content : {content}</Card.Text>
        </Card.Body>
        <div className="btn-grp">
          <Button
            variant="primary"
            className="m-2"
            onClick={() => {
              history.push({
                pathname: "/edit",
                state: { postData: { id, title, content } },
              });
            }}>
            Edit
          </Button>
          <Button variant="danger" className="m-2" onClick={deletePost}>
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(PostListComponent);
