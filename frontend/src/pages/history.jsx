import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Card, CardContent, IconButton, Typography, Grid } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import EventIcon from "@mui/icons-material/Event";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch(e){
        console.log(e)

      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Home Button */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <IconButton
          onClick={() => routeTo("/home")}
          sx={{ color: "#1976d2", mb: 2 }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </motion.div>

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" fontWeight="bold" display="flex" alignItems="center" mb={2}>
          <HistoryIcon sx={{ mr: 1, color: "#1976d2" }} /> Meeting History
        </Typography>
      </motion.div>

      {/* Meetings List */}
      {meetings.length !== 0 ? (
        <Grid container spacing={2}>
          {meetings.map((meeting, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.primary">
                      Code: {meeting.meeting_code}
                    </Typography>

                    <Typography
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      color="text.secondary"
                    >
                      <EventIcon sx={{ mr: 1, color: "#1976d2" }} /> Date: {formatDate(meeting.date)}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h6" textAlign="center" color="text.secondary" mt={4}>
            No meeting history available.
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}
