import React from "react";
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz, MdOutlineHotel, MdFlightTakeoff } from "react-icons/md";
import HotelForm from "../modals/HotelForm";

export default function Banner(props) {
  const { ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Ellipsis modals
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();

  // Modal for HotelForm
  const {
    isOpen: isOpenHotelForm,
    onOpen: onOpenHotelForm,
    onClose: onCloseHotelForm,
  } = useDisclosure();

  return (
    <>
      <Menu isOpen={isOpenMenu} onClose={onCloseMenu}>
        <MenuButton
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          onClick={onOpenMenu}
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
        </MenuButton>
        <MenuList
          w="150px"
          minW="unset"
          maxW="150px !important"
          border="transparent"
          backdropFilter="blur(63px)"
          bg={bgList}
          boxShadow={bgShadow}
          borderRadius="20px"
          p="15px"
        >
          <MenuItem
            transition="0.2s linear"
            color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
          >
            <Flex align="center">
              <Icon as={MdFlightTakeoff} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Add Flight
              </Text>
            </Flex>
          </MenuItem>
          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color={textColor}
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={onOpenHotelForm}
          >
            <Flex align="center">
              <Icon as={MdOutlineHotel} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Add Hotels
              </Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpenHotelForm} onClose={onCloseHotelForm} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Hotel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HotelForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
