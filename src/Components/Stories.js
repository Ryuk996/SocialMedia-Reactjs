import {useEffect,useState} from 'react'
import faker from 'faker'
import Story from './Story';
import "../Styles/global.css";

function Stories() {
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const suggestions =[...Array(20)].map((_,i)=>({                                       //contextualCard=> creates a buncg of fake datas
            ...faker.helpers.contextualCard(),
            id:i,
        }))
       setSuggestions(suggestions)
    }, [])
    return (
        <div className="storiesNav">
            {
                suggestions.map(profile=>(
                    <Story key={profile.id} img={profile.avatar} username={profile.username}/>
                ))
            }
        </div>
    )
}

export default Stories
