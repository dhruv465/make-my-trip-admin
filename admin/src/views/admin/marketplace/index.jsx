import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import NFT from "../../../components/card/NFT";
import HotelForm from "../../../components/modals/HotelForm";

export default function Marketplace() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/hotels`);
        setHotels(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, [BACKEND_URL]);

  // Function to handle deletion of a hotel
  const handleDeleteClick = async (hotelId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/hotels/${hotelId}`);
      // Update the hotels state after deletion
      setHotels(hotels.filter(hotel => hotel._id !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
    setIsModalOpen(false);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex direction="column">
            <Flex
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text
                color={textColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                Hotels Listed
              </Text>
            </Flex>

            {/* Conditionally render based on hotels array */}
            {loading ? (
              <Text>Loading...</Text>
            ) : hotels.length === 0 ? (
              <Text>No hotels added yet.</Text>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                {hotels.map((hotel) => (
                  <NFT
                    key={hotel._id} // Assuming each hotel has a unique ID
                    name={hotel.hotelName}
                    cityname={hotel.cityName}
                    image={hotel.imageUrl}
                    price={`$${hotel.price}`} // Assuming price is in dollars
                    onEditClick={() => handleEditClick(hotel)} // Pass the edit handler with the hotel details
                    onDeleteClick={() => handleDeleteClick(hotel._id)} // Pass the delete handler with the hotel ID
                  />
                ))}
              </SimpleGrid>
            )}
          </Flex>
        </Flex>
      </Grid>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Hotel Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HotelForm hotelData={selectedHotel} onClose={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
