import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import api from "./Api";

export default () => {
    const [posts, setPosts] = useState([[]]);
    const [upd, setUpd] = useState(false);
    useEffect(() => {
        let po = localStorage.getItem("posts");
        if (!po) {
            api.getPosts()
                .then(ans => {
                    console.log(ans);
                    let p = [];
                    for (let i = 0; i < ans.length; i++) {
                        if (i % 16 === 0) {
                            p.push([])
                        }
                        p[p.length - 1].push(ans[i]);
                    }
                    console.log(p);
                    setPosts(p);
                    localStorage.setItem("posts", JSON.stringify(p));
                })
            console.log("load");
        } else {
            console.log("here");
            setPosts(JSON.parse(po));
        }

    }, [upd])
    return <>
        <BrowserRouter>
            <h1>Мои любимые посты</h1>
            <Routes>
                <Route path="/" element={<div className="wrap">{posts[0].map(p => <div className="post" key={p._id}>
                    <div style={{width: "40%", height: "100%", backgroundImage: `url(${p.image})`, backgroundSize: "100%", backgroundPosition: "center" }}/>
                    {p.title}
                </div>)}</div>}/>
                {posts.map((p, i) => <Route path={"/"+(i+1)} element={<div className="wrap">{p.map(post => <div className="post" key={post._id}>{post.title}</div>)}</div>}/>)}
            </Routes>
            <div className="pages">
                {posts.map((p, i) => <Link to={"/"+(i+1)} className="page" key={i}>{i+1}</Link>)}
            </div>
        </BrowserRouter>
    </>
}
