import { StyleSheet } from 'react-native';

const variables = {
    icon: {
        size: 115
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    reqcity: {
        fontSize: 15,
        color: "rgba(255, 255, 255, .5)",
        marginBottom: 15,
    },
    icon: {
        width: variables.icon.size,
        height: variables.icon.size
    },
    temp: {
        fontSize: 30,
        color: "rgba(255, 255, 255, .9)",
        marginTop: 15,
        textAlign: "center"
    },
    desc: {
        fontSize: 20,
        color: "rgba(255, 255, 255, .8)",
        marginTop: 5,
        textAlign: "center"
    }
});

export default styles;