import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);

  const [matchPass, setMatchPass] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errorMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user); // regex method: tests for a match in a string. It returns true or false.
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    if (result) {
      setValidPass(true);
    } else {
      setValidPass(false);
    }

    const match = password === matchPass; // sets true or false
    setValidMatch(match);
  }, [password, matchPass]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccess(true);
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col xl={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>Register form</h3>
              </Card.Title>
              <Card.Text>
                {errorMessage ? <p>{errorMessage}</p> : null}

                <form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                      Username
                    </InputGroup.Text>
                    <Form.Control
                      id="username"
                      aria-describedby="basic-addon3"
                      type="text"
                      autoComplete="off"
                      required
                      onChange={(e) => setUser(e.target.value)}
                      aria-invalid={validName ? "false" : "true"}
                    />
                  </InputGroup>
                  <Card.Text>
                    {validName ? null : (
                      <p id="uidnote">
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p>
                    )}
                  </Card.Text>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                      Password
                    </InputGroup.Text>
                    <Form.Control
                      id="username"
                      aria-describedby="basic-addon3"
                      type="text"
                      autoComplete="off"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={validPass ? "false" : "true"}
                    />
                  </InputGroup>
                  <Card.Text>
                    {validPass ? null : (
                      <p id="passnote">
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                      </p>
                    )}
                  </Card.Text>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                      Confirm password
                    </InputGroup.Text>
                    <Form.Control
                      id="username"
                      aria-describedby="basic-addon3"
                      type="text"
                      autoComplete="off"
                      required
                      onChange={(e) => setMatchPass(e.target.value)}
                      aria-invalid={validPass ? "false" : "true"}
                    />
                  </InputGroup>
                  <Card.Text>{matchPass ? null : <p>Don't match</p>}</Card.Text>
                  <Card.Text>
                    <Button
                      disabled={
                        !validName || !validPass || !validMatch ? true : false
                      }
                    >
                      Sign up
                    </Button>
                  </Card.Text>
                  <Card.Text>
                    <p>Already registered?</p>
                    <Button disabled={true}>Sign in</Button>
                  </Card.Text>
                </form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
