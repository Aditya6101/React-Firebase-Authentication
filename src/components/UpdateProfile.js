import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();

    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      return setError("Password does not matched!");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    } else if (passwordRef.current.value !== currentUser.email) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update Profile!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeHolder="Leave blank to keep th same"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeHolder="Leave blank to keep th same"
              ></Form.Control>
            </Form.Group>
            <Button disabled={isLoading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Back To Dashboard</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
