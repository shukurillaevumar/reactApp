import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const RandomQuote = () => {
    const [quote, setQuote] = useState(null);
    const [quoteByTags, setQuoteByTag] = useState(null);
    const [tag, setTag] = useState('');
    const [count, setCount] = useState(1);

    const findQuote = async () => {
        const res = await axios.get(`https://api.quotable.io/random`);
        setQuote(res.data);
    }

    const searchByTag = async (e) => {
        e.preventDefault();
        const res = await axios.get("https://api.quotable.io/quotes/random?limit=" + count + "&tags=" + tag);
        setQuoteByTag(res.data);
    }

    useEffect(() => {
        findQuote();
    }, []);

    return (
    <div className="mainBox">
        <div className="cardQuoteOfTheDay">
            <h1>Quote of the Day</h1>
            <p>{quote.content}</p>
            <i>-{quote.author}</i>
            <div className="infoCard">
            <div>
            <i class="bi bi-volume-up-fill"></i>    
            <i class="bi bi-file-earmark-spreadsheet-fill"></i>
            <i class="bi bi-twitter"></i>
            </div>
            <>
            <button onClick={findQuote}>New Quote</button>
            </>
            </div>

        </div>
        <div className="mainBoxOfSearch">
            <form className="form" onSubmit={searchByTag}>
                <input type="text" placeholder="Write a tag..." value={tag} onChange={(e) => {
                    setTag(e.target.value);
                }} />

                <input type="number" id="count" min={1} max={50} value={count} onChange={(e) => {
                    setCount(e.target.value)
                }}/>

                <button type="submit">Search</button>
            </form>

            {quoteByTags &&
                quoteByTags.map((quoteByTag) => (
                    <div className="card" key={quoteByTag._id}>
                        <h2>{quoteByTag.author}</h2>
                        <p>{quoteByTag.content}</p>
                        {quoteByTag.tag.map((tag, index) => (
                            <h5 key={index}>{tag}</h5>
                        ))}
                    </div>
            ))}
        </div>
    </div>
    );
}