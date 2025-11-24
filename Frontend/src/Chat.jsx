import "./Chat.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const {newChat, prevChats, reply} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);
    const chatsEndRef = useRef(null);

    useEffect(() => {
        if(reply === null) {
            setLatestReply(null); //prevchat load
            return;
        }

        if(!prevChats?.length) return;

        const content = reply.split(" "); //individual words

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        chatsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [prevChats, latestReply]);

    return (
        <>
            {newChat && (
                <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                    <h1>
                        <i className="fa-solid fa-sparkles" style={{ marginRight: '12px', fontSize: '32px' }}></i>
                        Start a New Chat!
                    </h1>
                    <p style={{ 
                        color: 'var(--text-tertiary)', 
                        fontSize: '15px', 
                        marginTop: '12px',
                        maxWidth: '600px',
                        margin: '12px auto 0'
                    }}>
                        Ask me anything and I'll help you with thoughtful, detailed responses.
                    </p>
                </div>
            )}
            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat, idx) => 
                        <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                            {
                                chat.role === "user"? 
                                <p className="userMessage">{chat.content}</p> : 
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                {
                    prevChats.length > 0  && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"} >
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                                </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"} >
                                     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                </div>
                                )

                            }
                        </>
                    )
                }

                <div ref={chatsEndRef} />
            </div>
        </>
    )
}

export default Chat;