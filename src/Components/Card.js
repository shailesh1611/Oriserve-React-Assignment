import Preview from "./Preview";
const Card = ({id,secret,server})=>{
    return (
        <div className="card">
            <img src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`} 
            alt="img" className="img_body"></img>
        </div>
    );
}
export default Card;