import { View } from "react-native"
import { Avatar } from "react-native-paper"

const Profile = (props) => {
    const initial = props.item.firstName.charAt(0) + props.item.lastName.charAt(0)
    return(
        <View>
        {props.item.photo == 'N/A' ? 
        <Avatar.Text size={props.size} label={initial}/> :
        <Avatar.Image size={props.size} source={{uri: props.item.photo}}/>}
        </View>
    )
}

export default Profile