import React, { useContext, useState } from "react";
import { loader } from "graphql.macro";
import { useQuery, useMutation } from "@apollo/client";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Container,
  Form,
} from "semantic-ui-react";
import { src } from "../images/hackerman";
import moment from "moment";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";

const FETCH_POST_QUERY = loader("../graphql/fetchSinglePost.graphql");
const SUBMIT_COMMENT_QUERY = loader("../graphql/createComment.graphql");

export default function SinglePost(props) {
  const [comment, setComment] = useState("");

  function deletePostCallback() {
    props.history.push("/");
  }

  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const [submitComment] = useMutation(SUBMIT_COMMENT_QUERY, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
    onError(error) {
      console.log(error);
    },
  });

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading...</p>;
  } else if (!data.getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    postMarkup = (
      <Container style={{ margin: "auto", marginTop: 20 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src={src}
                size="small"
                float="right"
                style={{ height: "8em", width: "12em" }}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <Button labelPosition="right" as="div">
                    <Button color="red" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="red" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {user && username === user.username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a Comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="comment"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="ui button red"
                          disabled={comment.trim() === ""}
                          onClick={submitComment}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
  return postMarkup;
}
