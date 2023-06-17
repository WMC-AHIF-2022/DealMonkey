import React, { useState, ChangeEvent, useEffect } from "react";
import "./userProfile.css";
import {
  Box,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Card from "../../components/card";
import Layout from "../../layout/loggedIn/layout";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import { Popup } from "../../components/popup";
import FormInput from "../../components/form-input";
import { fetchRestEndpoint } from "../../utils/client-server";
import toast, { Toaster } from "react-hot-toast";
import flame from "../../img/flame.png";
import SideNavigation from "../../components/sideNavigation";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  birthdate: string;
  points: number;
  level: number;
  registrationDate: string;
}

export interface Setting {
  id: number;
  theme: string;
  userProfile: string;
  userId: number;
}

const UserProfile = (socket: any) => {
  const [habits, setHabits] = useState<HabitItem[]>([]);

  // const [user, setMyObject] = useState<User | null>(null);

  // const p = sessionStorage.getItem('userProfile') as string;

  // const parsedObject = JSON.parse(p);
  // setMyObject(parsedObject);

  // const pointsBar = document.querySelector('.bar') as HTMLElement;

  // pointsBar.style.width = '20%';

  //BUTTONS
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === "Settings") routeChange("/settings");
  };

  const auth = useAuthUser();

  //PROGRESS BAR
  const [progress, setProgress] = React.useState(50);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(
    "https://i.pinimg.com/564x/2e/60/80/2e60808c2b288e393128ebed7ee988b6.jpg"
  );

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  const changeUserProfile = () => {};

  const handleProfileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUserProfile(event.target.value as string);
  };

  const getProfile = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/settings/" + auth()?.id,
        "GET"
      );

      const data: Setting = await response.json();
      setUserProfile(data.userProfile);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updateProfile = async () => {
    try {
      await fetchRestEndpoint(
        "http://localhost:8000/api/settings/" + auth()?.id,
        "PUT",
        { profile: userProfile }
      );

      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  interface HabitItem {
    id: number;
    title: string;
    frequency: string;
    reminder: string;
    category: string;
    color: string;
    userId: number;
  }

  const getHabits = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/habits/" + auth()?.id,
        "GET"
      )
        .then((res) => res.json())
        .then((res) => {
          setHabits(res);
        });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const Card = () => {
    console.log(habits);

    return (
      <div className="habitsView">
        {habits.map((habit) => (
          <div className="activityTitle mb-6">
            <div className="cardTop">
              <h1 className="text-lg ml-4 mt-2">{habit.title}</h1>
              <img src={flame} width="40" height="30" />
            </div>
            <div className="cardBottom">
              <div>
                <div className="circle"></div>
                <h3 className="mb-4">Current Streak</h3>
              </div>
              <div>
                <div className="circle"></div>
                <h3 className="mb-4">Highest Streak</h3>
              </div>
              <div>
                <div className="circle"></div>
                <h3 className="mb-4">Point Multiplier</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    getProfile();
    getHabits();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-6 h-max">
        <SideNavigation />

        <div className="col-span-5 px-12 mt-4">
          <Toaster />
          <div className="profileArea1">
            {open ? (
              <Popup closePopup={() => setOpen(false)}>
                <FormInput
                  className="mt-5"
                  label="username"
                  placeholder="Username"
                  type="username"
                  required
                  name="username"
                  value={userProfile}
                  onChange={handleProfileChange}
                />

                <button
                  onClick={updateProfile}
                  className="mt-5 rounded-lg bg-orange-400"
                  type="submit"
                >
                  Save
                </button>
              </Popup>
            ) : null}
            <div className="profileTable1">
              <div className="row">
                <div className="profile-nav col-md-3">
                  <div className="panel">
                    <div className="user-heading round">
                      <a href="#">
                        <img
                          onClick={() => setOpen(true)}
                          src={userProfile}
                          alt="Profile-Picture"
                        />
                      </a>
                      <div className="username">
                        <h1>{auth()?.username}</h1>
                      </div>
                      <div className="profileButtons mb-12">
                        <ToggleButtonGroup
                          value={alignment}
                          exclusive
                          onChange={handleChange}
                          aria-label="Platform"
                        >
                          <ToggleButton value="Stats">Stats</ToggleButton>
                          <ToggleButton value="Settings">Settings</ToggleButton>
                        </ToggleButtonGroup>
                        -{" "}
                      </div>
                      <Card />
                    </div>
                  </div>
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
