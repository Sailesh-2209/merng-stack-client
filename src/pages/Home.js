import React from "react";
import { useQuery, gql } from "@apollo/client";
// import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import { PostCard } from "../components";

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1 style={{ marginTop: 20, marginLeft: 20 }}>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => {
            return (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
}
