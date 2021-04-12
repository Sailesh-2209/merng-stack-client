import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { PostCard, PostForm } from "../components";

const query = loader("../graphql/fetchPosts.graphql");
export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(query);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1 style={{ marginTop: 20, marginLeft: 20 }}>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
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
