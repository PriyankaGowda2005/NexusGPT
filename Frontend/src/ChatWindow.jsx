import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat, sidebarOpen, setSidebarOpen} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userIconRef = useRef(null);

    const getReply = async () => {
        if (!prompt.trim() || loading) return;
        
        setLoading(true);
        setNewChat(false);

        const messageToSend = prompt.trim();
        console.log("message ", messageToSend, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: messageToSend,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.error("Error fetching reply:", err);
            setReply("Sorry, I encountered an error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply, prompt, setPrevChats, setPrompt]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && 
                dropdownRef.current && 
                userIconRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !userIconRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <span>
                        <i className="fa-solid fa-sparkles" style={{ marginRight: '8px', fontSize: '18px' }}></i>
                        NexusGPT
                    </span>
                </div>
                <div className="userIconDiv" onClick={handleProfileClick} ref={userIconRef}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown" ref={dropdownRef}>
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            <Chat></Chat>

            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <ScaleLoader color="#6366f1" loading={loading} height={35} width={4} radius={2} margin={2} />
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', marginTop: '8px' }}>Thinking...</p>
                </div>
            )}
            
            <div className="chatInput">
                <div className="inputBox">
                    <input 
                        type="text"
                        placeholder="Message NexusGPT..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !loading) {
                                e.preventDefault();
                                if (prompt.trim()) {
                                    getReply();
                                }
                            }
                        }}
                        disabled={loading}
                        style={{ color: '#ffffff' }}
                    />
                    <div 
                        id="submit" 
                        onClick={() => {
                            if (prompt.trim() && !loading) {
                                getReply();
                            }
                        }}
                        style={{
                            opacity: prompt.trim() && !loading ? 1 : 0.5,
                            cursor: prompt.trim() && !loading ? 'pointer' : 'not-allowed'
                        }}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    NexusGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;