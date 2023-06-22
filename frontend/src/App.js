import React, { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import Preloader from "./components/Preloader/Preloader";
import {
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const App = () => {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {isLoading ? (
          <Preloader />
        ) : (
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" gutterBottom>
              ToDo App
            </Typography>
            <div className="top">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add ToDos..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={
                  isUpdating
                    ? () =>
                        updateToDo(
                          toDoId,
                          text,
                          setToDo,
                          setText,
                          setIsUpdating
                        )
                    : () => addToDo(text, setText, setToDo)
                }
              >
                {isUpdating ? "Update" : "Add"}
              </Button>
            </div>
            <div className="list">
              {toDo.map((item) => (
                <ToDo
                  key={item._id}
                  text={item.text}
                  updateMode={() => updateMode(item._id, item.text)}
                  deleteToDo={() => deleteToDo(item._id, setToDo)}
                />
              ))}
            </div>
            <div className="theme-toggle">
              <Switch
                checked={isDarkMode}
                onChange={handleToggleTheme}
                color="primary"
              />
              <Typography variant="body2">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Typography>
            </div>
          </Container>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
