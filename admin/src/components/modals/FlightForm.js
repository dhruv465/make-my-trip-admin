import React, { useState, useEffect } from 'react';
import axios from "axios";

import {
    FormControl,
    FormLabel,
    Checkbox,
    Input,
    Box,
    Button,
    Stack,
    useToast,
} from '@chakra-ui/react';

const FlightForm = ({ flightData, onClose }) => {
    const [departureCity, setDepartureCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [classSelection, setClassSelection] = useState([]);
    const toast = useToast();

    useEffect(() => {
        if (flightData) {
            setDepartureCity(flightData.departureCity || '');
            setDestinationCity(flightData.destinationCity || '');
            setDepartureDate(flightData.departureDate || '');
            setReturnDate(flightData.returnDate || '');
            setClassSelection(flightData.classSelection || []);
        }
    }, [flightData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!departureCity || !destinationCity || !departureDate || !returnDate) {
            toast({
                title: "Error",
                description: "Please fill all the required fields.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            if (flightData && flightData._id) {
                await axios.put(`http://localhost:5001/api/flights/${flightData._id}`, {
                    departureCity,
                    destinationCity,
                    departureDate,
                    returnDate,
                    classSelection,
                });
                toast({
                    title: "Success",
                    description: "Flight details updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                await axios.post('http://localhost:5001/api/flights', {
                    departureCity,
                    destinationCity,
                    departureDate,
                    returnDate,
                    classSelection,
                });
                toast({
                    title: "Success",
                    description: "Flight added successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setDepartureCity('');
                setDestinationCity('');
                setDepartureDate('');
                setReturnDate('');
                setClassSelection([]);
            }

            onClose(); // Close the modal after successful submission
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
            <Stack spacing={4} align="flex-start">
                <FormControl id="departureCity" isRequired>
                    <FormLabel>Departure City</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter departure city"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                    />
                </FormControl>

                <FormControl id="destinationCity" isRequired>
                    <FormLabel>Destination City</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter destination city"
                        value={destinationCity}
                        onChange={(e) => setDestinationCity(e.target.value)}
                    />
                </FormControl>

                <FormControl id="departureDate" isRequired>
                    <FormLabel>Departure Date</FormLabel>
                    <Input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </FormControl>

                <FormControl id="returnDate" isRequired>
                    <FormLabel>Return Date</FormLabel>
                    <Input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </FormControl>

                <FormControl id="class">
                    <FormLabel>Traveler/Class</FormLabel>
                    <Stack direction="column">
                        <Checkbox
                            value="economy"
                            isChecked={classSelection.includes('economy')}
                            onChange={(e) =>
                                e.target.checked
                                    ? setClassSelection([...classSelection, 'economy'])
                                    : setClassSelection(classSelection.filter((c) => c !== 'economy'))
                            }
                        >
                            Economy
                        </Checkbox>
                        <Checkbox
                            value="premiumEconomy"
                            isChecked={classSelection.includes('premiumEconomy')}
                            onChange={(e) =>
                                e.target.checked
                                    ? setClassSelection([...classSelection, 'premiumEconomy'])
                                    : setClassSelection(classSelection.filter((c) => c !== 'premiumEconomy'))
                            }
                        >
                            Premium Economy
                        </Checkbox>
                        <Checkbox
                            value="business"
                            isChecked={classSelection.includes('business')}
                            onChange={(e) =>
                                e.target.checked
                                    ? setClassSelection([...classSelection, 'business'])
                                    : setClassSelection(classSelection.filter((c) => c !== 'business'))
                            }
                        >
                            Business
                        </Checkbox>
                    </Stack>
                </FormControl>

                <Button colorScheme="blue" type="submit">
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default FlightForm;
