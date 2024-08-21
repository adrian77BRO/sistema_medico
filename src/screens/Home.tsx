import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const HomeScreen: React.FC = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Adrián Pérez</Text>
            <View style={styles.box}>
                <Text style={styles.text}>Citas</Text>
                <Text style={styles.subtext}>5</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Consultas</Text>
                <Text style={styles.subtext}>20</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Pacientes</Text>
                <Text style={styles.subtext}>4</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 40,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 25,
        marginBottom: 20
    },
    box: {
        width: 300,
        height: 150,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,

    },
    text: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subtext: {
        color: '#fff',
        fontSize: 30,
        marginTop: 10
    }
});

/*import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';

export const HomeScreen: React.FC = () => {
    const tableHead = ['ID', 'Name', 'Age', 'Gender'];
    const tableData = [
        [
            <Text>Hola</Text>,
            <View style={styles.actionButtons}>
                <Button title="Detalles" />
                <Button title="E" />
                <Button title="D" color="red" />
            </View>,
            <Text>Hola</Text>,
            <Text>Hola</Text>,
        ],
        ['2', 'Jane Smith', '30', 'Female'],
        ['3', 'Sam Johnson', '22', 'Male'],
        ['4', 'Adrián Mauricio Hernández Pérez', '28', 'Female'],
    ];

    const columnWidths = [50, 200, 100, 100];

    return (
        <ScrollView horizontal>
            <View style={styles.container}>
                <View style={[styles.row, styles.headerRow]}>
                    {tableHead.map((header, index) => (
                        <View key={index} style={[styles.cell, { width: columnWidths[index] }]}>
                            <Text style={[styles.text, styles.headerText]}>{header}</Text>
                        </View>
                    ))}
                </View>

                {tableData.map((rowData, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {rowData.map((cellData, cellIndex) => (
                            <View key={cellIndex} style={[styles.cell, { width: columnWidths[cellIndex] }]}>
                                <Text style={styles.text}>{cellData}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#c8e1ff',
    },
    headerRow: {
        backgroundColor: '#f1f8ff',
        borderBottomWidth: 2,
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#c8e1ff',
    },
    text: {
        textAlign: 'center',
    },
    headerText: {
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});*/