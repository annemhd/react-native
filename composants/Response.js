import { StyleSheet } from 'react-native'

export function Response(props) {
    let message = props.message
    let componentStyle = props.componentStyle

    const handleStyle = (componentStyle) => {
        if (componentStyle === 'sender') return styles.sender
        if (componentStyle === 'recipient') return styles.recipient
    }

    return <div style={handleStyle(componentStyle)}>{message}</div>
}

const styles = StyleSheet.create({
    sender: {
        display: 'flex',
        justifyItems: 'end',
        maxWidth: '60%',
        padding: '16px',
        borderRadius: '24px',
        backgroundColor: '#4f46e5',
        color: '#fff',
    },
    recipient: {
        maxWidth: '60%',
        padding: '16px',
        borderRadius: '24px',
        backgroundColor: '#cbd5e1',
        color: '#1e293b',
    },
})
