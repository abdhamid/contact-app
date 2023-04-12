import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Profile from "./Profile"
import theme from '../styles/theme.style'
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { Animated } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';

const Card = (props) => {
    const editHandler = () => {
        props.onEdit(props.value)
    }

    const deleteHandler = () => {
        props.onDelete(props.value)
    }

    const onRightSwipe= (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
          return (
            <View style={styles.swipeContainer}>
            <TouchableOpacity onPress={editHandler} activeOpacity={0.6}>
              <View style={styles.actionBox}>
              <Icon name="edit" size={30} color={theme.ON_BACKGROUND_TEXT}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteHandler} activeOpacity={0.6}>
              <View style={[styles.actionBox,{backgroundColor: theme.WARNING}]}>
                <Icon name="delete-outline" size={30} color={theme.ON_BACKGROUND_TEXT}/>
              </View>
            </TouchableOpacity>
            </View>
          )
    }
    return(
        <GestureHandlerRootView>
        <Swipeable
            renderRightActions={onRightSwipe}
        >
        <View style={styles.cardItem}>
            <View style={styles.content}>
            <Profile item={props.value}/>
            <View style={styles.contentText}>
            <Text style={styles.cardMainText}>{props.value.firstName + " " +props.value.lastName}</Text>
            <Text style={styles.cardSecondaryText}>{"Age :" + props.value.age}</Text>
            </View>
            </View>
            
        </View>
        </Swipeable>
        </GestureHandlerRootView>
    )
}

export default Card

const styles = StyleSheet.create({
    cardItem: {
        flexDirection: "row",
        // marginBottom: 8,
        padding: 8,
        borderRadius: 10,
        backgroundColor: theme.BACKGROUND,
        justifyContent: "space-between",
        height: 80
    },
    cardMainText: {
        marginTop: 5,
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight:"bold",
        color: theme.ON_BACKGROUND_TEXT
    },
    cardSecondaryText: {
        marginTop: 5,
        marginHorizontal: 20,
        fontSize: 14,
        color: theme.SECONDARY_TEXT
    },
    content: {
        flexDirection:"row",
        padding:5
    },
    actions: {
        flexDirection: "column"
    },
    edit: {
        color: 'blue'
    },
    swipeContainer: {
        flexDirection: "row",
        height: "100%"
    },
    delete: {
        color: 'red'
    },
    actionBox: {
        backgroundColor: theme.OK,
        height: 80,
        width: 80,
        alignItems: "center",
        justifyContent: "center"
        // marginBottom: 8,
        // padding:8
    }
})