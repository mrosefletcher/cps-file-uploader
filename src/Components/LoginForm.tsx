'use client';

import React, { FC } from 'react';
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: FC = () => {
    const [user, setUser] = useState<String>("");
    const [password, setPassword] = useState<String>("");
  
    const handleLogin = () => {/*this is where we send the info to somewhere useful? */};

  return (
    <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="user"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Link
                to="https://airtable.com/appCIzOVL0mDMRwr4/pag0HvQvbOcHE7Q8B/form"
                rel="noopener noreferrer"
                target="_blank"
                    >
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Box>
        <Box>you just typed in {user}</Box>
      </Container>
  );
};

export default LoginForm;


/*

// Since React 18, FC doesn't add the children prop implicitly 
// and offers an explicit way to do so with the PropsWithChildren generix type

type ComponentWithChildrenProps = PropsWithChildren<{ a: string }>;

const ComponentWithChildrenProps: FC<ComponentWithChildrenProps> = ({
  a,
  children
}) => <div>{a} and {children}</div>


// This allows to have a children prop a bit stricter. e.g.

type StrictCompProps = { children: string };

const StrictComp: FC<StrictCompProps> = ({ children }) => <div>{children}</div>;

// This will fail
<StrictComp><span>hey</span></StrictComp>
 */