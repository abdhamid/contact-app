import axios from "axios"
import { useState } from "react"
import { FlatList, View } from "react-native"
import Card from "./Card"

const ContactList = (props) => {

    const handleEdit = (item) => {
        props.handleEdit(item)
    }

    const handleDelete = (item) => {
        props.handleDelete(item)
    }
    

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={props.contacts}
                // contentContainerStyle={{paddingBottom: 20, marginTop:10, marginHorizontal:5}}
                renderItem={itemData => {
                    return (
                        <Card value={itemData.item} onEdit={() => handleEdit(itemData.item)} onDelete={() => handleDelete(itemData.item)}/>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

export default ContactList