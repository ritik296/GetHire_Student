import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { PutApi } from "../utilis/Api_Calling";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SeniorSecondaryModal = ({ onOpen, onClose, profile }) => {

  const [education, setEducation] = useState({
    Education: profile?.Education
  });

  const [CollegeName, setCollegeName] = useState('')
  const [StartYear, setStartYear] = useState('')
  const [EndYear, setEndYear] = useState('')
  const [Degree, setDegree] = useState('')
  const [Stream, setStream] = useState('')
  const [PerformanceScale, setPerformanceScale] = useState('')
  const [Performance, setPerformance] = useState('')

  const updateEducation = async () => {
    try {
      const updatedEducation = {
        Class: 'Senior Secondary  (XII)',
        CollegeName,
        StartYear,
        EndYear,
        Degree,
        Stream,
        PerformanceScale,
        Performance,
      };

      const updatedProfile = { ...profile };
      updatedProfile.Education.push(updatedEducation);


      const response = await PutApi('api/StudentRoutes/UpdateStudentProfile', { Education: updatedProfile.Education });
      console.log(response?.data)
      alert("Education details updated successfully.");
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error updating education details');
    }
  };




  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={onOpen}
      >
        <DialogTitle
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#000",
            textAlign: "center",
          }}
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          Senior Secondary or Equivalent (XII) details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <div className="bg-[#5956e9] w-[33.33px] h-[33.33px] rounded-[50%] flex justify-center items-center text-white">
            <CloseIcon />
          </div>
        </IconButton>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  variant="subtitle1"
                >
                  School
                </Typography>
                <TextField
                  placeholder="e.g.IGNOU"
                  className="text-[16px] font-[600]"
                  name="designation"
                  fullWidth
                  margin="normal"
                  value={CollegeName}
                  onChange={(e) => { setCollegeName(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12} >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  Year of completion
                </Typography>

                <Select
                  value={EndYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  fullWidth
                  displayEmpty
                  inputProps={{
                    'aria-label': 'Select year',
                  }}
                >
                  <MenuItem value="" disabled>
                    Choose year
                  </MenuItem>
                  {Array.from({ length: 51 }, (_, index) => 2000 + index).map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  variant="subtitle1"
                >
                  Board
                </Typography>
                <TextField
                  placeholder="eg: CBSE"
                  className="text-[16px] font-[600]"
                  name="profile"
                  fullWidth
                  margin="normal"
                  value={Degree}
                  onChange={(e) => { setDegree(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12} md={6} mt={2}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Performance scale
                  <span className="text-[#000] ml-[5px] text-opacity-[50%]">
                    (Optional)
                  </span>
                </Typography>
                <Select
                  value={PerformanceScale}
                  onChange={(e) => setPerformanceScale(e.target.value)}
                  fullWidth
                  displayEmpty
                  inputProps={{
                    'aria-label': 'Select year',
                  }}
                >
                  <MenuItem value="" disabled>
                    Choose Performance scale
                  </MenuItem>
                  <MenuItem value="Percentage" >
                    Percentage
                  </MenuItem>
                  <MenuItem value="CGPA" >
                    CGPA
                  </MenuItem>
                  <MenuItem value="SGPA" >
                    SGPA
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Performance
                  <span className="text-[#000] ml-[5px] text-opacity-[50%]">
                    (Optional)
                  </span>
                </Typography>

                <TextField
                  placeholder="e.g. CBSE"
                  className="text-[16px] font-[600]"
                  fullWidth
                  margin="normal"
                  value={Performance}
                  onChange={(e) => { setPerformance(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Stream
                  <span className="text-[#000] ml-[5px] text-opacity-[50%]">
                    (Optional)
                  </span>
                </Typography>
                <TextField
                  placeholder="Choose stream"
                  className="text-[16px] font-[600]"
                  fullWidth
                  margin="normal"
                  value={Stream}
                  onChange={(e)=>setStream(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className="w-[87px] h-[49px] bg-gradient-to-tl from-[#0f87b3] to-[#462da1] text-[#fff] text-[16px] font-[500]"
            onClick={updateEducation}
            style={{
              color: "#fff",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default SeniorSecondaryModal;
