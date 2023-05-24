import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => (
  <div style={{ marginBottom: 20 }}>
    <CircularProgress
      sx={{
        "--CircularProgress-size": "40px",
        "--CircularProgress-trackThickness": "13px",
        "--CircularProgress-progressThickness": "7px",
      }}
    />
  </div>
);
