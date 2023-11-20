import React from 'react';
import { InfoIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Icon,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { FaInfoCircle } from 'react-icons/fa';


const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
          <>
            
        <IconButton d={{ base: "flex" }} icon={<InfoIcon />} onClick={onOpen} />
          </>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay />
        
        <ModalContent h="380px" bg="purple.800">
         <Text
            fontSize="20px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            
            color="#61dbfb"
          >
            <Icon as={FaInfoCircle } mr={2} color="red" />
 USER INFO :
          </Text>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            fontWeight="bold"
            color="#61dbfb"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
             
            <Avatar size="2xl" name={user.name} borderColor="black" borderWidth="2px" bg="#61dbfb" color="black"/>
            <Text
              fontSize={{ base: "28px", md: "30px" }} fontWeight="bold" color="#61dbfb"
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme='red'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModal;