import React from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

import { useForm } from "../utils/hooks";

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const query = loader("../graphql/fetchPosts.graphql");

export default function PostForm() {
  const { onSubmit, onChange, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query });
      let newData = {
        ...data,
        getPosts: [result.data.createPost, ...data.getPosts],
      };
      console.log(newData);
      proxy.writeQuery({ query, data: newData });
      values.body = "";
    },
    onError() {
      console.log("error");
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="hi"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button type="submit" color="red">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}
