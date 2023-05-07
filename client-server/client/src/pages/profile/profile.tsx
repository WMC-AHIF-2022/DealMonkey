import React, { useState } from 'react';

import './userProfile.css';
import { Box, LinearProgress, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Card from '../../components/card';
import Layout from '../../layout/loggedIn/layout';

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
    setAlignment(newAlignment);
  };

  //PROGRESS BAR
  const [progress, setProgress] = React.useState(50);

  return (
    <Layout>
      <div className="profileArea1">
        <div className="profileTable1">
          <div className="row">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#">
                    <img src="https://i.pinimg.com/564x/75/90/4d/75904d968f8ee57bb0e1fd28f3424a53.jpg" alt="Profile-Picture"/>
                  </a>
                  <h1>Hog Rider</h1>
                  <p>hogrider@gmail.com</p>

                  <div className="profileButtons">
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="web">Stats</ToggleButton>
                      <ToggleButton value="android">Settings</ToggleButton>
                    </ToggleButtonGroup>
                  </div>

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
