import Card from "./Card";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { SEARCH_URL } from "../utils/constants";

const Body = () => {
    const [photos,setPhotos] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true);
    const [searchText,setSearchText] = useState("");
    const [preview,setPreview] = useState(false);

    useEffect(()=>{
        if(searchText.length !== 0) {
            const searchValue = searchText.split(" ");
            const query = searchValue.join("+");
            fetchSearchQuery(page,query);
        }
        else fetchData(page);
        setLoading(false);
    },[page]);

    useEffect(()=>{
        window.addEventListener("scroll",handleInfiniteScroll);
        return () => window.removeEventListener("scroll",handleInfiniteScroll);
    },[]);

    const fetchData = async (page) => {
        const data = await fetch(`${API_URL}+&page=${page}`);
        const json = await data.json();
        //console.log(json);
        setPhotos((prev) => [...prev, ...json?.photos?.photo]);
    }

    const fetchSearchQuery = async (page,query) => {
        const data = await fetch(`${SEARCH_URL}+&page=${page}+&text=${query}`);
        const json = await data.json();
        if(page === 1) setPhotos(json?.photos?.photo);
        else setPhotos((prev) => [...prev, ...json?.photos?.photo]);
    }

    const handleInfiniteScroll = () => {
        try {
            if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setLoading(true);
                setPage((prev)=>prev+1);
            }
        }
        catch {
            console.log("Error Infinite Scroll");
        }
    }
    
    return photos.length === 0 ? <Shimmer/> :
    (
        <>
            <div className="nav_bar">
                <div className="nav_bar_text">Search Photos</div>

                <div className="search_box">
                    <input type="search"
                    className="input_box"
                    placeholder="Search photos e.g. virat kohli, moutains"
                    value={searchText}
                    onChange={(e)=>{setSearchText(e.target.value)}}></input>
                    
                    <button className="btn_search"
                    type="button" 
                    onClick={()=>{
                        if(searchText.length !== 0) {
                            const searchValue = searchText.split(" ");
                            const query = searchValue.join("+");
                            fetchSearchQuery(1,query);
                        }
                    }}>
                        Search
                    </button>
                </div>
            </div>

            <div className="img_container">
                {loading && <Shimmer/>}
                {photos.map((photo)=>(
                    <Card id={photo.id} secret={photo.secret} server={photo.server} key={photo.id}/>
                ))}
            </div>
        </>
        
    )
}
export default Body;