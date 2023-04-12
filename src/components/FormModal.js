import { useEffect, useState } from "react"
import { Button, Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import theme from '../styles/theme.style'
import { TextInput } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"


const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const FormModal = (props) => {
    // console.log("modal ", props.item)
    // console.log(props.isEdit)
    const [contact, setContact] = useState({ age: '', firstName: '', lastName: '', photo: "N/A" })

    useEffect(() => {
        if (props.editForm) {
            setContact(props.item)
        }
    }, [])

    const handleSubmit = () => {
        props.onSubmit(contact)
    }

    return (
        <Modal
            animationType="slide"
            onRequestClose={props.onDismissModal}
            transparent
        >
            <KeyboardAvoidingView
            style={{flex: 1}}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{props.editForm ? 'Edit Contact' : 'Create New Contact'}</Text>
                    <TextInput style={styles.inputContainer} placeholderTextColor={theme.SECONDARY_TEXT} placeholder="First Name" value={contact.firstName} onChangeText={(firstName) => setContact({ ...contact, firstName: firstName })} />
                    <TextInput style={styles.inputContainer} placeholderTextColor={theme.SECONDARY_TEXT} placeholder="Last Name" value={contact.lastName} onChangeText={(lastName) => setContact({ ...contact, lastName: lastName })} />
                    <TextInput style={styles.inputContainer} placeholderTextColor={theme.SECONDARY_TEXT} placeholder="Age"  keyboardType="numeric" value={contact.age.toString()} onChangeText={(age) => setContact({ ...contact, age: age })} />
                    <Pressable style={styles.buttonContainer} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>submit</Text>
                    </Pressable>
                </View>
            </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default FormModal

const styles = StyleSheet.create({
    modalContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        position: 'absolute',
        top: SCREEN_HEIGHT / 4,
        backgroundColor: theme.BACKGROUND,
        borderRadius: 25,
        padding: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.ON_BACKGROUND_TEXT,
        marginBottom: 20
    },
    inputContainer: {
        borderRadius: 10,
        color: theme.ON_PRIMARY_TEXT,
        marginBottom: 10,
        backgroundColor: theme.SURFACE,
        width: '100%',
        padding: 5,
        paddingLeft: 10
    },
    buttonContainer: {
        backgroundColor: theme.PRIMARY,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 5
    },
    buttonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})