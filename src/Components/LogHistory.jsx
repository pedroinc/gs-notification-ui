import { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { fetchLogs } from "../services";

export const LogHistory = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs()
      .then((res) => res.json())
      .then((data) => {
        console.log("logs", data);
        setLogs(data);
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography margin="20px 0 0 20px" align="center" variant="h5">
        Log History
      </Typography>

      {loading ? (
        <Skeleton variant="circular" sx={{ fontSize: "1rem" }} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>datetime</TableCell>
                <TableCell>type</TableCell>
                <TableCell>category</TableCell>
                <TableCell>content</TableCell>
                <TableCell>user id</TableCell>
                <TableCell>user name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.datetime}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.content}</TableCell>
                  <TableCell>{row.user.id}</TableCell>
                  <TableCell>{row.user.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
