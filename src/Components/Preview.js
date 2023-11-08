const Preview = (server,id,secret) => {
    return (
        <div className="preview">
            <img src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
            className="preview_popup"></img>
        </div>
    );
}
export default Preview;