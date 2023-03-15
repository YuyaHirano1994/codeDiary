import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import SessionLoader from "../../common/SessionLoader";
import { sessionState } from "../../atom/sessionAtom";
import { useRecoilState } from "recoil";
import { Box, Button, Container, TextareaAutosize, TextField, Typography } from "@mui/material";
import BackButton from "../../components/BackButton";

const EditDay = () => {
  const { id, day_id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: "",
    user_id: "",
    date: "",
    content: "",
    created_at: "",
    updated_at: "",
  });

  // dayデータ取得
  const getDay = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("day_id", day_id, "challenge_id", id, "user_id", user.id);
      setFormValue({ ...formValue, ...data[0] });
    } catch (error) {}
  };

  useEffect(() => {
    // getChallenge();
    getDay();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    try {
      console.log("user: " + user.id);
      const { error } = await supabase
        .from("day")
        .update([
          {
            date: formValue.date,
            content: formValue.content,
            updated_at: now,
          },
        ])
        .eq("day_id", formValue.day_id, "challenge_id", formValue.challenge_id, "user_id", user.id);
      if (error) {
        throw error;
      }
      alert("Update your day Success");
      setFormValue({ ...formValue, date: "", content: "" });
      getDay();
      navigate(`/challenge/${id}`);
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const backHome = () => {
    navigate("/mypage");
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" align="center" sx={{ marginBottom: 2 }}>
            Edit Day
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              value={formValue.date}
              onChange={handleChange}
              margin="normal"
              required
              // fullWidth
              disabled
              name="date"
              label="Date"
              type="date"
              id="date"
              variant="standard"
            />
            <TextareaAutosize
              style={{ width: "100%" }}
              minRows={10}
              value={formValue.content}
              onChange={handleChange}
              placeholder="What did you do today?"
              id="content"
              name="content"
              required
            ></TextareaAutosize>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
            <BackButton />
          </Box>
        </Box>
      </Container>
      {/* <div>
        <h1>Edit Day Data</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input value={formValue.date} onChange={handleChange} type="date" name="date" required />
          </div>
          <div>
            <label>Content: </label>
            <textarea value={formValue.content} onChange={handleChange} type="text" name="content" required />
          </div>
          <button type="submit">Update</button>
          <hr />
          <button onClick={backHome}>BACK</button>
        </form>
      </div> */}
    </>
  );
};

export default EditDay;
