


const Modal = () => {

return(
    
    <section>

        <form action="">

            <div>
                
                <input type="text" name="company" id="" />
                <input type="text" name="role" id="" />
                <input type="text" name="date" id="" />
                <input type="text" name="link" id="" />
            
            </div>

            <textarea name="moodMsg" id=""></textarea>
            <select name="status" id="">
                
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="ghosted">Ghosted</option>
            
            </select>
        </form>

    </section>
)


}


export default Modal