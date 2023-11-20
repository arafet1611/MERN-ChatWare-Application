import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Icon,
  Header 
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));

    if (userInformation) navigate("/chats");
  }, [navigate]);

  return (
    <><Container maxW="xl" py={2} alignItems="center">
      <Flex justifyContent={{ base: "center", lg: "flex-start" }} alignItems="center" flexWrap="wrap">
        
    <Box d="flex" alignItems="center" color="white" px={2}>
      <Icon as={FaPhone} mr={2} color="blue"  />
      <Text>+216 50132080</Text>
    </Box>
    <Box display={{ base: "none", lg: "flex" }} alignItems="center" color="white" px={2}>
      <Icon as={FaEnvelope } mr={2} color="blue" />
      <Text> Arafetalaya6@gmail.com</Text>
    </Box>
      </Flex>
          <Box
  display="flex"
  justifyContent="center"
  p={3}
  w="100%"
  m="40px 0 15px 0"
>
  <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "50px" , color: "white"  }}>
    Welcome to Chat<span style={{ color: "#61dbfb" }}>Ware</span>
  </h1>
</div>
</Box>
</Container>

  
    <Container maxW="xl" centerContent marginRight="30px">
      <Box
        d="flex"
        justifyContent="center"
        margin = "3.2rem 0 1rem 0"
        p={3}
        borderRadius="lg"
        borderColor="white" borderWidth="1px"
        w="100%"
          bg="teal"
          
      >
        <Text
          color="white"
          fontSize="4xl"
          fontFamily="Work sans"
          fontWeight="bold"
        >
          Chat<span style={{ color: "#61dbfb" }}>Ware</span>
        </Text>
      </Box>
      <Box bg="blue.50" w="100%" p={4} borderRadius="lg" borderColor="white" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded" colorScheme="cyan" >
          <TabList mb="1em">
            <Tab fontWeight="bold">Login</Tab>
            <Tab fontWeight="bold">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      </Container>
      </>
  );
};

export default HomePage;
