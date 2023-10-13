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

// State
import { useStateValue } from "../Login/context/StateProvider"

const Sidebar = () => {
	const [{ user }, dispatch] = useStateValue()
	return (
		<SidebarWrapper>
			<SidebarRow src={user.photoURL} title={user.displayName} />
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
