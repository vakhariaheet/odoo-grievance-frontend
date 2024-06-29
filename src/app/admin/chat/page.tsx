"use client";

import { socket } from "@/app/socket";
import { useEffect, useState } from "react";
import { getClientInfo } from "./actions";

const Chat = () => { 
    const [ messages, setMessages ] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>();
    const [message, setMessage] = useState<string>('');
    useEffect(() => {
        (async () => {
            const user = await getClientInfo();
            setCurrentUser(user);
            console.log(user);
            socket.emit('register', {
                user_id: user.id,
            });
            console.log("registered");
            socket.on('receive_message', (message: any) => { 
                handleMessage(message);
            })
        })();
    }, []);
    const handleMessage = (message: any) => { 
        setMessages([...messages, message]);
    }
    const onSend = () => { 
        if(message) { 
            socket.emit('send_message', {
                message,
                sender: currentUser.id,
                receiver: '',
                grievance_id: 'dc232079-7c60-41a1-bcf9-fa8b1f33bd62',
            });
            setMessage('');
        }
    }

    return (
        <div className="min-h-screen">
            <h1>Chat</h1>
            <div>

            </div>
            <div className="flex">
                <input type="text" placeholder="Type a message" className="border w-full border-gray-300 p-2 rounded-lg" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">Send</button>
            </div>
        </div>
    )
}

export default Chat;
