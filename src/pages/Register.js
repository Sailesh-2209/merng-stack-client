import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Register(props) {
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={onChange}
          type="text"
          error={errors.username ? true : false}
        />
        <Form.Input
          label="Email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={onChange}
          type="email"
          error={errors.email ? true : false}
        />
        <Form.Input
          label="Password"
          name="password"
          placeholder="Password"
          value={values.pasword}
          onChange={onChange}
          type="password"
          error={errors.password ? true : false}
        />
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Password"
          value={values.confirmPasword}
          onChange={onChange}
          type="password"
          error={errors.confirmPassword ? true : false}
        />
        <Button type="submit" color="red">
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Register;
