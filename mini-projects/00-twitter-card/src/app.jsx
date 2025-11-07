import { use, useState } from 'react'
import { TwitterFollowCard } from './TwitterFollowCard'
import './assets/app.css'
const user = [
    {
        name: "Fabio Vidal",
        userName: "yisus",
        initialIsFollowing: true
    },
    {
        name: "Juan carlos",
        userName: "midudev",
        initialIsFollowing: false
    },
    {
        name: "Nohel Flores",
        userName: "jesus",
        initialIsFollowing: true
    },
    {
        name: "Cesar Amado",
        userName: "samuel",
        initialIsFollowing: false
    },
    {
        name: "Ivana Restrepo",
        userName: "yisusislove",
        initialIsFollowing: true
    }
]

export function App(){
    return(
        <section className='tw-followCard-container'>
            {
                user.map(user => {
                    const {name, userName, initialIsFollowing} = user
                    return(
                        <TwitterFollowCard
                            name={name}
                            userName={userName}
                            initialIsFollowing={initialIsFollowing}
                        >
                            
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}