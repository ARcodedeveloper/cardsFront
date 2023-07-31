import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import InfoIcon from "@mui/icons-material/Info";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { useUser } from "../../users/providers/UserProvider";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <>
      <Paper
        sx={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 9999}}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="About"
            icon={<InfoIcon />}
            onClick={() => navigate(ROUTES.ABOUT)}
          />
          <BottomNavigationAction
            label="Cards"
            icon={<AssignmentIndIcon />}
            onClick={() => navigate(ROUTES.CARDS)}
          />
          {user?.isBusiness && (
            <BottomNavigationAction
              label="My cards"
              icon={<RecentActorsIcon />}
              onClick={() => navigate(ROUTES.MY_CARDS)}
            />
          )}
          {user && (
            <BottomNavigationAction
              label="Favorite cards"
              icon={<CollectionsBookmarkIcon />}
              onClick={() => navigate(ROUTES.FAV_CARDS)}
            />
          )}
        </BottomNavigation>
      </Paper>
    </>
  );
}
