import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type SearchBarProps = {
    searchTerm: string;
    onSearch: (term: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    return (
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChangeText={onSearch}
        />
    );
};

const styles = StyleSheet.create({
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
});
