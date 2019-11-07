import {
    GET_CONTACT,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    SET_CURRENT,
    CONTACT_ERROR,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    // SET_ALERT,
    // REMOVE_ALERT
} from '../Type';

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            };

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
                loading: false
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                current: null,
                loading: false
            };

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                current: null,
                error: null
            }

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(action.payload, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex)
                }),
                loading: false

            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                loading: false
            };

        default:
            return state;
    }
}