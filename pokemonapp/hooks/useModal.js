import { useState } from "react";

export function useModal() {

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Etsitään Pokemon ID:llä ja asetetaan modal näkyväksi
    const showModal = (pokemons, pokemonId) => {
        setSelectedPokemon(pokemons.find((p) => p.id === pokemonId));
        setModalVisible(true);
    };

    // Piilotetaan modal ja asetetaan Pokemon nulliksi 
    const hideModal = () => {
        setModalVisible(false);
        setSelectedPokemon(null);
    };

    return { selectedPokemon, modalVisible, showModal, hideModal };
}