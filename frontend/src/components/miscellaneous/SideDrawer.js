import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../Context/chat-context";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Icon, Input, Spinner } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import { FaSearch } from "react-icons/fa";


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = useContext(ChatContext);

  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInformation");
    navigate("/");
  };

  const handleSearch = async() => {

    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      //console.log(data, 'searchQuerry keyword response data');

      setLoading(false);
      setSearchResult(data);

    } catch (error) {

      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  

  const accessChatCreateChat = async (userId) => {

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]); 

      setSelectedChat(data);

      console.log(data, 'access new/existing chat response data');

      setLoadingChat(false);
      onClose(); 
    } catch (error) {

      console.log(error.message);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <React.Fragment>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="white"
        bg="teal"
        color="white"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" bg ='#61dbfb' onClick={onOpen} color="white"
            _hover={{ background: "white", color:"black" }} _active={{ background: "purple.800", color:"yellow.400" }}>
                    <Icon as={FaSearch } mr={2} color="black" />
              <Text d={{ base: "none", md: "flex" }} px={4} fontWeight="bold">
                Search User
              </Text>
          </Button>
        </Tooltip>

        <Text fontSize="3xl" fontFamily="Work sans bold" fontWeight='bold' color="white" >
          Chat<span style={{ color: "#61dbfb" }}>Ware</span>
        </Text>

        <div>
       
          <Menu>
            <MenuButton as={Button} bg="#61dbfb"  rightIcon={<ChevronDownIcon/>}  
              _hover={{background: "white", color:"black"}} _active={{background: "#61dbfb", color:"black"}}>
              <Avatar size="sm" cursor="pointer" name={user.name} borderColor="black" borderWidth="2px" bg="gray" color="black"/>
            </MenuButton>
            <MenuList bg = "gray" borderColor="black" borderWidth="2px">
              <ProfileModal user={user}>
                <MenuItem fontWeight="bold" color="white" _hover={{background: "#61dbfb"}}  >
                  My Profile
                </MenuItem>{" "}
              </ProfileModal>
              <MenuDivider/>
              <MenuItem fontWeight="bold" color="white" onClick={logoutHandler} _hover={{background: "#61dbfb"}}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => ( //user clicked on for chat
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChatCreateChat(user._id)}
                />
              ))
            )} 
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
