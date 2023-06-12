import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuItems.map((v, i) => (
            <ListItem button key={v}>
              <ListItemIcon>
                {i % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>
              <ListItemText>{v}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((v, i) => (
            <ListItem button key={v}>
              <ListItemIcon>
                {i % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>
              <ListItemText>{v}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
