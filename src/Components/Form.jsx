import { useEffect, useState } from "react";
import { fetchCategories, sendMessage } from "../services";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";

export default function Form() {
  const [snackbar, setSnackBar] = useState({
    show: false,
    message: "",
  });

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCategories()
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  const handleSnackClose = () => {
    setSnackBar({ show: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryId || !form.content) {
      setSnackBar({ show: true, message: "Please provide a valid input" });
      return;
    }

    sendMessage(form.categoryId, form.content)
      .then((response) => response.json())
      .then((data) => {
        setSnackBar({ show: true, message: "Message sent" });
      })
      .catch((error) => {
        console.log("error", error);
        setSnackBar({ show: true, message: "Error while sending the message" });
      });
  };

  const textareaStyle = {
    margin: "20px 0 0 0",
    padding: "10px",
    border: "solid 1px #cccccc",
    height: "12em",
    width: "30em",
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography marginBottom="10px" component="h1" variant="h5">
          Message Form
        </Typography>
        <FormControl fullWidth>
          <InputLabel variant="filled" id="category-label">
            Category
          </InputLabel>
          <Select
            labelId="category-label"
            id="categoryId"
            name="categoryId"
            onChange={handleChange}
            value={form.categoryId}
          >
            <MenuItem value="">
              <em>(select)</em>
            </MenuItem>
            {categories.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <textarea
          id="content"
          name="content"
          label="Message"
          value={form.content}
          onChange={handleChange}
          style={textareaStyle}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>

        <Snackbar
          open={snackbar.show}
          autoHideDuration={4000}
          message={snackbar.message}
          onClose={handleSnackClose}
        />
      </Box>
    </Container>
  );
}
