import React, { useContext } from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Container,
} from "semantic-ui-react";
import { src } from "../images/hackerman";
import moment from "moment";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";

const FETCH_POST_QUERY = loader("../graphql/fetchSinglePost.graphql");

export default function SinglePost(props) {
  function deletePostCallback() {
    props.history.push("/");
  }

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
                  {user && username === user.username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
  return postMarkup;
}
