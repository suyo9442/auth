import React, {useState, useEffect} from 'react';
import { async } from '@firebase/util';
import { dbService, collection, addDoc, getDocs } from 'fbase';


const Home = () => {
    // 데이터를 추가하기 위한 임시 state
    const [nweet, setNweet] = useState('');

    // 여러 데이터를 가져오기 위한 빈 배열 state
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const querySnapShot = await getDocs(collection(dbService,"nweets"));
        querySnapShot.forEach((doc)=> {
            const nweetObject = {
                ...doc.data(), // nweet의 전체 내용물
                id: document.id,
            };
            // 기존에 들어있던 값 = prev
            // prev값 앞에 새로운 데이터 오브젝트들을 붙여서 업데이트
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    
    useState(()=>{
        getNweets();
    }, []);

    const onSubmit = async(event) => {
        event.preventDefault();
    
        // users라는 doc을 collection에 추가할 것임
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
              nweet: nweet, // 🤔❓ => ❕nweet는 곧 nweet 니까 축약해서 'nweet'?
              createdAt: Date.now(),
            });
            console.log("Document written with ID: ", docRef.id);
            setNweet(''); // 🤔❓ => ❕새로운 트윗을 데이터에 추가한 후 state를 비워야하니까? 
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    };

    const onChange = (event) => {
        const { target:{ value } } = event;
        setNweet(value);
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120}
                    value={nweet}
                    onChange={onChange}
                />
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweets) => (
                    <div>
                        <h4>{nweets.nweet}</h4>
                    </div>    
                ))}
            </div>
        </>
    )
}
export default Home;

