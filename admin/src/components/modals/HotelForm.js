import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Image,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const HotelForm = ({ hotelData, onClose }) => {
  const [hotelImage, setHotelImage] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [cityName, setCityName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (hotelData) {
      setHotelName(hotelData.hotelName || "");
      setCityName(hotelData.cityName || "");
      setPrice(hotelData.price || "");
      setHotelImage(hotelData.imageUrl || null);
    }
  }, [hotelData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotelImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleImageRemove = () => {
    setHotelImage(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelName || !cityName || !price || (!imageFile && !hotelImage)) {
      toast({
        title: "Error",
        description: "Please fill all the fields and upload an image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      let imageUrl = hotelImage;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'make-my-trip-clone');

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dvfrcaw1c/image/upload',
          formData,
        );

        imageUrl = cloudinaryResponse.data.secure_url;
      }

      if (hotelData && hotelData._id) {
        // Update existing hotel
        await axios.put(`http://localhost:5001/api/hotels/${hotelData._id}`, {
          hotelName,
          cityName,
          price,
          imageUrl,
        });
        toast({
          title: "Success",
          description: "Hotel details updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Create new hotel
        await axios.post('http://localhost:5001/api/hotels', {
          hotelName,
          cityName,
          price,
          imageUrl,
        });
        toast({
          title: "Success",
          description: "Hotel added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setHotelImage(null);
        setHotelName("");
        setCityName("");
        setPrice("");
        setImageFile(null);
      }

      // onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error uploading the data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="flex-start">
        <FormControl id="hotel-image">
          <FormLabel>Upload Hotel Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {hotelImage ? (
            <Box position="relative" mt={2}>
              <Image
                src={hotelImage}
                alt="Hotel"
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              />
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={handleImageRemove}
                aria-label="Remove Image"
              />
            </Box>
          ) : (
            <Text color="gray.500" mt={2}>
              No image uploaded
            </Text>
          )}
        </FormControl>

        <FormControl id="hotel-name" isRequired>
          <FormLabel>Hotel Name</FormLabel>
          <Input
            placeholder="Enter hotel name"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </FormControl>

        <FormControl id="city-name" isRequired>
          <FormLabel>City Name</FormLabel>
          <Input
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </FormControl>

        <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder="Enter price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default HotelForm;
