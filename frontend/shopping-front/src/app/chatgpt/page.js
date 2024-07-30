import { useState } from 'react';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const sendMessage = async () => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        setChatLog([...chatLog, { role: 'user', content: message }, { role: 'assistant', content: data.reply }]);
        setMessage('');
    };

    return (
        <div>
            <h1>ChatGPT ile Sohbet</h1>
            <div>
                {chatLog.map((entry, index) => (
                    <div key={index} className={entry.role}>
                        <strong>{entry.role}:</strong> {entry.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Gönder</button>
        </div>
    );
}
