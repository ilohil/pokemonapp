import { useState } from "react";
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export function useContacts() {

    // Tehdään muuttujat kontakteille ja dialogin näkyvyydelle
    const [contacts, setContacts] = useState([]);
    const [formattedContacts, setFormattedContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState({});
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('');

    // Tehdään funktio dialogin näyttämiselle ja piilottamiselle
    const showDialog = () => {
        getContacts();
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
        setSelected("")
    };

    // Funktio valitun kontaktin löytämiseen ID:llä

    const setSelect = (id) => {

        setSelected(id)
        const contact = contacts.find((contact) => contact.id === id);

        if (contact) {
            setSelectedContact(contact);
        } else {
            console.log("Kontaktia ei löytynyt");
            alert("Kontaktia ei löytynyt")
        }

    };


    // Tällä haetaan kontaktit tekstiviestin lähettämiseen
    const getContacts = async () => {

        const { status } = await Contacts.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync(
                { fields: [Contacts.Fields.PhoneNumbers] }
            );

            const formattedData = data.map((contact) => ({
                key: `${contact.id}`,
                value: `${contact.name}`

            }));

            setFormattedContacts(formattedData);
            setContacts(data);

        }
    };

    // Tällä lähetetään viesti suosikkipokemoneista
    const sendSms = async (favoritePokemonList) => {

        const isSMSAvailable = await SMS.isAvailableAsync();

        const favoriteSMS = favoritePokemonList.map(pokemon => pokemon.name).join(', ');

        if (isSMSAvailable) {
            const { result } = await SMS.sendSMSAsync([selectedContact.phoneNumbers[0].number],
                'My favourite Pokémons: ' + favoriteSMS);
        } else {
            console.log("Viestiä ei voi lähettää")
        }

        hideDialog();

    }

    return { visible, formattedContacts, showDialog, hideDialog, sendSms, setSelect, selected }

}