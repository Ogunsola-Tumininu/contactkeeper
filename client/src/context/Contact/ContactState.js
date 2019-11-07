import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    GET_CONTACT,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    // SET_ALERT,
    // REMOVE_ALERT
} from '../Type';

const ContactState = props => {
    const intialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null

    }

    const [state, dispatch] = useReducer(ContactReducer, intialState);

    // Get Contact 
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACT, payload: res.data });
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }

    }

    // Add Contact 
    const addContact = async contact => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }

    }

    // Update Contact 
    const updateContact = async contact => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            getContacts();
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    }

    // Delete Contact 
    const deleteContact = async id => {

        try {
            await axios.delete('/api/contacts/' + id);
            dispatch({ type: DELETE_CONTACT, payload: id });
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }

    }

    // Set Current Contact 
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // Clear Current Contact 
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Clear Filter 
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    }

    // Filter Contact 
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    // Clear Filter 
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }



    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                updateContact,
                clearContacts,
                filterContacts,
                clearFilter,
                setCurrent,
                clearCurrent

            }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState

