import {Box, Divider, Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemText, Toolbar, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Drawer = styled(MuiDrawer)(() => ({
    Paper: {
        root: {
            backgroundColor: '#393939'
        }
    }
}));

export const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{width: '180px'}} className="sidebar">
            <Drawer
                variant="permanent"
            >
                <Toolbar />
                    RECO
                <Divider />

                <List>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemText primary="Apps Discovery" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/inventory')}>
                            <ListItemText primary="Apps Inventory" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/settings')}>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};
