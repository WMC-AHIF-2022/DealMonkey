import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { fetchRestEndpoint } from "../utils/client-server";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import toast, { Toaster } from "react-hot-toast";
import Coin from "../img/star.png";
import { heIL } from "@mui/x-date-pickers";

interface Progress {
  userId: number;
  points: number;
  experience: number;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", color: "orange.400" }}>
      <Box sx={{ width: "100%", mr: 1, color: "orange.400" }}>
        <Stack sx={{ width: "100%", color: "grey.300" }} spacing={2}>
          <LinearProgress variant="determinate" {...props} />
        </Stack>
      </Box>
      <Box sx={{ minWidth: 35, color: "orange.400" }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function ProgressBar() {
  const [experience, setExperience] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const auth = useAuthUser();

  const getProgress = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/progress/" + auth()?.id,
        "GET"
      );

      const data: Progress = await response.json();
      console.log(data, auth()?.id);
      setExperience(data.experience);
      setPoints(data.points);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    getProgress();
  }, []);

  return (
    <div style={{ width: "100% " }} className="flex flex-row">
      <Box sx={{ width: "90%", color: "orange.400" }}>
        <div className="flex flex-row justify-between mr-10">
          <span className="">Level 01</span>
        </div>

        <Toaster />
        <LinearProgressWithLabel
          value={experience}
          color="inherit"
          style={{ backgroundColor: "#fdfff5", height: "0.5em" }}
        />
      </Box>

      <div className="flex flex-row justify-center mt-5 ml-4">
        <span className="mr-1">{points}</span>
        <img
          src={Coin}
          style={{ width: "1em", height: "1em", marginTop: "5px" }}
        />
      </div>
    </div>
  );
}
