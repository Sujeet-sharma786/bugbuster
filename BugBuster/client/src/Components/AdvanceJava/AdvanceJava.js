import React, { useState, useEffect } from 'react';
import "./AdvanceJava.css";
const AdvanceJava = () => {
    // const handlePost = () => {
    //     console.log("Post button clicked");
    const [showModal, setShowModal] = useState(false);
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    const [tutorial, setTutorial] = useState([]);
    const [askAI, setAskAi] = useState("");
    const [aiPrompt, setAiPrompt] = useState(false);
    const [aiGeneratedContent, setAiGeneratedContent] = useState("");
    useEffect(() => {
        const fetchContent = async () => {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            try {
                const response = await fetch(`${BASE_URL}/get-advance-java`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched content:', data);
                    setTutorial(data);
                } else {
                    console.error('Error fetching content:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };
        fetchContent();
        getIp();

    }, []);

    //------------------------------------------------------------------------------------------------------------------------------------------
    // AI Integration

    const handleAi = async () => {
        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-chat:free",
                "messages": [
                    {
                        "role": "user",
                        "content": askAI
                    }
                ]
            })
        });
        response = await response.json();
        console.log(response.choices[0].message.content);
        // setAiPrompt(false);
        setAiGeneratedContent(response.choices[0].message.content);
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------
    //Get Ip of user

    const getIp = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log("User IP:", data.ip);
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------

    const handlePostContent = () => {
        setShowModal(true);
    };
    const handlePost = async () => {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        try {
            const response = await fetch(`${BASE_URL}/advance-java`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ headline, content }),
            });

            if (response.ok) {
                console.log('Content posted successfully');
                setShowModal(false);
            } else {
                console.error('Error posting content:', response.statusText);
            }
        } catch (error) {
            console.error('Error posting content:', error);
        }
        setShowModal(false);
        window.location.reload();

    };



    return (
        <div className='advance-java'>
            <h1>Advance Java</h1>

            {/* <p>Welcome to the Advance Java page. Explore advanced concepts and features of Java programming.</p> */}
            <button onClick={handlePostContent} style={{margin:"2px",height:"30px",border:"none",borderRadius:"5px",backgroundColor:"green",color:"white",padding:"5px",cursor:"pointer"}}>Post content</button>
            {/* <input type="text" placeholder="Enter headline" onChange={(e)=>setAskAi(e.target.value)} /> */}
            <button onClick={(e) => setAiPrompt(true)} style={{margin:"2px",height:"30px",border:"none",borderRadius:"5px",backgroundColor:"green",color:"white",padding:"5px",cursor:"pointer"}}>deepseek-AI</button>
            <div >
                {

                    tutorial.slice().reverse().map((data) => {
                        return (
                            <div className="tutorial-content">
                                <h2>{data.headline}</h2>
                                <p>{data.content}</p>
                            </div>
                        );
                    })
                }
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 style={{textAlign:"center"}}>Post Content</h2>
                        <button 
                                style={{color:"white", position: "absolute", top: "10px", right: "10px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }} 
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        {/* <p>This is a centered modal triggered by the Post button.</p> */}
                        <input type="text" placeholder="Enter headline" onChange={(e) => setHeadline(e.target.value)} style={{height:"30px",borderRadius:"10px",border:"none",padding:"3px"}}/>

                        <textarea placeholder="Enter content" onChange={(e) => setContent(e.target.value)}  style={{borderRadius:"10px",border:"none",padding:"3px"}}></textarea>

                        <button onClick={handlePost} style={{height:"30px",border:"none",borderRadius:"5px",cursor:"pointer",backgroundColor:"green",color:"white"}}>Post</button>
                    </div>
                </div>
            )}
            {
                aiPrompt && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 style={{textAlign:"center"}}>DeepSeek</h2>
                            <button 
                                style={{color:"white", position: "absolute", top: "10px", right: "10px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }} 
                                onClick={() => setAiPrompt(false)}
                            >
                                &times;
                            </button>
                            {/* <button 
                                style={{ position: "absolute", top: "10px", right: "10px" }} 
                                onClick={() => setAiPrompt(false)}
                            >
                                Cut
                            </button> */}
                            {/* <p>This is a centered modal triggered by the Post button.</p> */}

                            <input type="text" placeholder="ask AI" onChange={(e) => setAskAi(e.target.value)} style={{height:"30px",borderRadius:"10px",border:"none",padding:"3px"}} />
                            
                                <textarea
                                    // placeholder="Enter content" 
                                    // onChange={(e) => setContent(e.target.value)} 
                                    value={aiGeneratedContent}
                                style={{borderRadius:"10px",border:"none",padding:"3px"}}></textarea>
                               
                            <button onClick={handleAi} style={{height:"30px",border:"none",borderRadius:"5px",cursor:"pointer",backgroundColor:"green",color:"white"}}>ask-AI</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AdvanceJava;