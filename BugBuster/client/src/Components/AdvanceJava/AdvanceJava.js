import React,{useState,useEffect} from 'react';
import "./AdvanceJava.css";
const AdvanceJava = () => {
    // const handlePost = () => {
    //     console.log("Post button clicked");
    const [showModal, setShowModal] = useState(false);
    const [headline,setHeadline] = useState("");
    const [content,setContent] = useState("");
    const [tutorial,setTutorial] = useState([]);
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
        
    }, []);

    
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
        // window.location.reload();
        
    };

    

    return (
        <div className='advance-java'>
            <h1>Advance Java</h1>

            {/* <p>Welcome to the Advance Java page. Explore advanced concepts and features of Java programming.</p> */}
            <button onClick={handlePostContent}>Post content</button>
            <div >
                {

                    tutorial.map((data)=>{
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
                        <h2>Post Content</h2>
                        {/* <p>This is a centered modal triggered by the Post button.</p> */}
                        <input type="text" placeholder="Enter headline" onChange={(e)=>setHeadline(e.target.value)} />
                        <textarea placeholder="Enter content" onChange={(e)=>setContent(e.target.value)}></textarea>
                       
                        <button onClick={handlePost}>Post</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvanceJava;