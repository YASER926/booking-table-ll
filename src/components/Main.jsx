import React, { useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Booking from './Booking';
import ConfirmedBooking from './ConfirmedBooking';
import Header from './Header';

const Main = () => {
    // Function to generate a seeded random number generator
    const seededRandom = (seed) => {
        const m = 2 ** 35 - 31;
        const a = 185852;
        let s = seed % m;
        return () => (s = (s * a) % m) / m;
    };

    // Function to fetch available times based on the date
    const fetchAPI = (date) => {
        const result = [];
        const random = seededRandom(date.getDate());

        for (let i = 17; i <= 23; i++) {
            if (random() < 0.5) {
                result.push(`${i}:00`);
            }
            if (random() < 0.5) {
                result.push(`${i}:30`);
            }
        }
        return result;
    };

    // Function to simulate form submission
    const submitAPI = (formData) => {
        return true; // Simulate successful submission
    };

    const initialState = { availableTimes: fetchAPI(new Date()) };
    const [state, dispatch] = useReducer(updateTimes, initialState);

    // Reducer function to update available times
    function updateTimes(state, date) {
        return { availableTimes: fetchAPI(new Date(date)) };
    }

    const navigate = useNavigate();

    // Function to handle form submission
    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate("/confirmed");
        }
    };

    return (
        <main>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route 
                    path="/booking" 
                    element={
                        <Booking 
                            availableTimes={state.availableTimes} 
                            dispatch={dispatch} 
                            submitForm={submitForm} 
                        />
                    } 
                />
                <Route path="/confirmed" element={<ConfirmedBooking />} />
            </Routes>
        </main>
    );
};

export default Main;