import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'

import { StyleSheet, View } from 'react-native'
import { Response } from './composants/Response'

export default function App() {
    const [userResponse, setUserResponse] = useState('')
    const [messages, setMessages] = useState([])
    const [botResponse] = useState([
        "Désolé je n'ai pas compris, veuillez reformuler la question s'il vous plait",
        "Ce n'est pas clair...",
        'Demandez à Google, bye ',
        'Pardon ?',
    ])

    let [index, setIndex] = useState(Math.floor(Math.random() * botResponse.length))

    const handleStyleByUser = (userType) => {
        if (userType === 'user') return 'sender'
        else return 'recipient'
    }

    const handleStyle = (item) => {
        if (item === 'user') return styles.sender
        else return styles.recepient
    }

    const displayMessages = messages.map((item) => (
        <div style={handleStyle(item.user)}>
            <Response
                message={item.message}
                componentStyle={handleStyleByUser(item.user)}
                key={item.message}
            />
        </div>
    ))

    const sendMessage = (e) => {
        e.preventDefault()
        setMessages([...messages, { user: 'user', message: userResponse }])
        index = Math.floor(Math.random() * botResponse.length)
        setIndex(index)
        setTimeout(() => {
            setMessages((item) => [...item, { user: 'bot', message: botResponse[index] }])
        }, 200)
    }
    const welcome = () => {
        setMessages([
            ...messages,
            {
                user: 'bot',
                message: 'Bonjour ! Je suis Mr. Robot, que puis-je faire pour vous ?',
            },
        ])
    }

    useEffect(() => {
        welcome()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <div style={styles.messagesContainer}>{displayMessages}</div>
            <form style={styles.bottom} onSubmit={sendMessage}>
                <input
                    placeholder="Ecrivez votre question"
                    style={styles.input}
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                />
                <button style={styles.button} onClick={sendMessage}>
                    Envoyer
                </button>
            </form>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Arial',
        display: 'flex',
        width: '100% ',

        backgroundColor: '#fff',
        padding: '24px',
        justifyContent: 'space-between',
    },
    messagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    sender: { display: 'flex', justifyContent: 'flex-end' },
    recepient: { display: 'flex' },
    input: {
        width: 'calc(100% - 150px)',
        height: '50.5px',
        display: 'flex',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '32px',
        border: '1px solid #cbd5e1',
        fontSize: '16px',
    },
    bottom: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '24px',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '50px',
        borderRadius: '24px',
        backgroundColor: '#cbd5e1',
        border: 'none',
    },
})
