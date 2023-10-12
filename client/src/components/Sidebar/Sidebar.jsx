import styled from "styled-components"
import SidebarRow from "./SidebarRow"

// MUI ICONS
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags"
import PeopleIcon from "@mui/icons-material/People"
import ChatIcon from "@mui/icons-material/Chat"
import StorefrontIcon from "@mui/icons-material/Storefront"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined"

const Sidebar = () => {
	return (
		<SidebarWrapper>
			<SidebarRow
				src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
				title="Jayson Romero"
			/>
			<SidebarRow
				Icon={LocalHospitalIcon}
				title="COVID-19 Information Center"
			/>
			<SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
			<SidebarRow Icon={PeopleIcon} title="Friends" />
			<SidebarRow Icon={ChatIcon} title="Messenger" />
			<SidebarRow Icon={StorefrontIcon} title="Marketplace" />
			<SidebarRow Icon={VideoLibraryIcon} title="Videos" />
			<SidebarRow Icon={ExpandMoreOutlinedIcon} title="More" />
		</SidebarWrapper>
	)
}

const SidebarWrapper = styled.div``

export default Sidebar
