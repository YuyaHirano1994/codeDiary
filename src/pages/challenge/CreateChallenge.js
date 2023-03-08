import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import SessionLoader from "../../common/SessionLoader";
import { sessionState } from "../../atom/sessionAtom";
import { useRecoilState } from "recoil";
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import Challenge from "./Challenge";
import { Box, Container } from "@mui/system";

const CreateChallenge = () => {
  const dt = new Date();
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  var today = `${y}-${m}-${d}`;

  const [formValue, setFormValue] = useState({
    challenge_id: "",
    title: "",
    category: "",
    days: 0,
    desc: "",
    start_date: today,
    end_date: "",
    created_at: "",
    updated_at: "",
  });

  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;
  const [showCategory, setShowCategory] = useState("");
  const [hiddenEl, setHiddenEl] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setShowCategory(e.target.value);
    console.log(e.target.value);
    if (e.target.value !== "other") {
      setFormValue({ ...formValue, category: e.target.value });
      setHiddenEl(true);
    } else {
      setFormValue({ ...formValue, category: "" });
      setHiddenEl(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("user: " + user.id);
      const { error } = await supabase.from("challenge").insert([
        {
          user_id: user.id,
          title: formValue.title,
          category: formValue.category,
          days: formValue.days,
          desc: formValue.desc,
          start_date: formValue.start_date,
        },
      ]);
      if (error) {
        throw error;
      }
      alert("new challenge Success");
      navigate("/mypage");
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const backHome = () => {
    navigate(-1);
  };

  const categories = ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"];

  return (
    <>
      <Container>
        <Typography variant="h3" align="center">
          Let's Start your New Challenge!
        </Typography>
        <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={formValue.title}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title"
              type="text"
              id="title"
              autoComplete="title"
              autoFocus
              variant="standard"
            />
            <Box display="flex">
              <FormControl sx={{ m: 1, width: "50%" }}>
                <InputLabel id="category">category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={showCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {hiddenEl ? (
                <></>
              ) : (
                <TextField
                  value={formValue.category}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="category"
                  label="category"
                  type="text"
                  id="category"
                  autoComplete="category"
                  autoFocus
                  variant="standard"
                  disabled={hiddenEl}
                  sx={{ width: "50%" }}
                />
              )}
            </Box>
            <TextField
              value={formValue.days}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="days"
              label="How long would you need? "
              type="number"
              id="days"
              autoComplete="days"
              autoFocus
              variant="standard"
            />
            <TextField
              value={formValue.desc}
              onChange={handleChange}
              multiline
              rows={6}
              required
              fullWidth
              id="desc"
              name="desc"
              label="Description"
              color="secondary"
              margin="normal"
              inputProps={{ maxLength: 1000, style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              value={formValue.start_date}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="start_date"
              label="Start Date"
              type="date"
              id="start_date"
              autoComplete="start_date"
              autoFocus
              variant="standard"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add new Challenge
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateChallenge;
