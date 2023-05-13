import React, { useState } from 'react';

import './userProfile.css';
import { Box, LinearProgress, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Card from '../../components/card';
import Layout from '../../layout/loggedIn/layout';
import { useNavigate } from "react-router-dom";

export interface User {
  id: number,
  username: string,
  password: string,
  email: string,
  birthdate: string,
  points: number,
  level: number,
  registrationDate: string
}

const UserProfile = () => {

  // const [user, setMyObject] = useState<User | null>(null);

  // const p = sessionStorage.getItem('userProfile') as string;

  // const parsedObject = JSON.parse(p);
  // setMyObject(parsedObject);

  // const pointsBar = document.querySelector('.bar') as HTMLElement;

  // pointsBar.style.width = '20%';

  //BUTTONS
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if(newAlignment === "Settings")
      routeChange("/settings");
  };

  //PROGRESS BAR
  const [progress, setProgress] = React.useState(50);

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="profileArea1">
        <div className="profileTable1">
          <div className="row">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#">
                    <img src="https://i.pinimg.com/750x/bf/e9/3a/bfe93a722d06d7f29990f266109f67ea.jpg" alt="Profile-Picture"/>
                  </a>
                  <h1>Grüne Viech</h1>
                  <p>grueneviech@gmail.com</p>

                  <div className="profileButtons">
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="Stats">Stats</ToggleButton>
                      <ToggleButton value="Settings">Settings</ToggleButton>
                    </ToggleButtonGroup>
-                  </div>

                  <div className="mt-8">
                    <h3 className="text-left mb-3">Level 01</h3>
                    <Box sx={{ width: "100%", color: "#FF0000" }}>
                      <LinearProgress className="mb-12" variant="buffer" value={progress} />
                    </Box>
                  </div>
                  <Card />
                  <Card />
                  <Card />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
