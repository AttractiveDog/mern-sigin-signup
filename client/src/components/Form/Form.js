import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return <h1>Login Succesfull</h1>;
};

export default Form;
