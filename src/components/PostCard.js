import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, Image, Icon, Label, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

export default function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button labelPosition="right" as={Link} to={`/post/${id}`}>
          <Button color="red" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="red" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => console.log("delete post")}
            floated="right"
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
