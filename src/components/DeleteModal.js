import { TextInput } from "@react-native-material/core"
import { useEffect, useState } from "react"
import { Button, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Profile from "./Profile"
import theme from '../styles/theme.style'

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const DeleteModal = (props) => {

    const deleteHandler = () => {
        props.onDelete(props.item)
    }
    return (
        <Modal
            animationType="fade"
            onRequestClose={props.onDismissModal}
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={styles.modalContainer}>
                    <View style={styles.contact}>
                        <Profile item={props.item} size={100} />
                        <Text style={styles.contactText}>{props.item.firstName + " " + props.item.lastName}</Text>
                    </View>
                    <Text style={styles.actionText}>Are you sure you want to delete this contact ?</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={deleteHandler} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onDismissModal} style={[styles.buttonContainer, { backgroundColor: theme.WARNING }]}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({
    modalContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        position: 'absolute',
        top: SCREEN_HEIGHT / 2,
        backgroundColor: theme.BACKGROUND,
        borderRadius: 25,
        padding: 25,
        alignItems: "center"

    },
    contact: {
        margin: 10,
        alignItems: "center"
    },
    contactText: {
        marginTop: 10,
        fontSize: 20,
        color: theme.ON_BACKGROUND_TEXT,
        fontWeight: "bold"
    },
    actionText: {
        marginTop: 5,
        fontSize: 16,
        color: theme.ON_PRIMARY_TEXT,
        alignSelf: "center"
    },
    actions: {
        marginTop: 20,
        flexDirection: "column",
        justifyContent: "space-around",
        width: '100%'

    },
    buttonContainer: {
        backgroundColor: theme.OK,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})