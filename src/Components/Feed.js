import React from 'react'
import Posts from './Posts'
import Stories from './Stories'
import SubProfile from './SubProfile'
import Suggestions from './Suggestions'
import "../Styles/global.css"

function Feed() {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto '>
            <section className="col-span-2">
            {/* section */}
               <Stories />
               <Posts />
            </section>


            <section className="hidden xl:inline-grid md:col-span-1">
            {/* section     */}
            <div className="fixed top-20">
                <SubProfile />
                <Suggestions />
            </div>
            </section>
        </main>
    )
}

export default Feed
