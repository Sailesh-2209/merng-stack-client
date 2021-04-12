import React, { useContext } from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import moment from "moment";

import { AuthContext } from "../context/auth";

const FETCH_POST_QUERY = loader("../graphql/fetchSinglePost.graphql");

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
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
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
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
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color="red">
                    <Icon name="comments" />
                    <Label basic color="red" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}
