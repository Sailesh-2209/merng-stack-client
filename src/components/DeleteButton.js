import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const DELETE_POST_MUTATION = loader("../graphql/deletePost.graphql");
const FETCH_POST_QUERY = loader("../graphql/fetchPosts.graphql");

export default function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      if (callback) {
        callback();
      }
      const data = proxy.readQuery({ query: FETCH_POST_QUERY });
      let newData;
      newData = {
        ...data,
        getPosts: data.getPosts.filter((item) => item.id !== postId),
      };
      proxy.writeQuery({ query: FETCH_POST_QUERY, data: newData });
    },
    variables: {
      postId,
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        floated="right"
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePost()}
      />
    </>
  );
}
