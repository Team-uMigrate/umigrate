import React from "react";
import {Avatar} from "react-native-paper";
import {Image} from "react-native";

const ProfilePhoto = ({photo}) => {
    const PROFILEIMAGESIZE = 45;

    if(photo === null) {
        return (
            <Avatar.Icon size={PROFILEIMAGESIZE} icon={"account"} />
        );
    }
    else {
        return (
            <Avatar.Image size={PROFILEIMAGESIZE} source={{uri: photo}}/>
        );
    }
}

export default ProfilePhoto;