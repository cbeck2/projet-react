export function FormTweet(){
    const [tweet,setTweet] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await postTweet(tweet,getUserId())
        result ? setRedirect(true) : console.log("erreur envoi tweet")
    }

    return(
        <div>
            {redirect && <Navigate to="/tweet" />}
            <form>
            <input
                type="text"
                required
                value={tweet}
                placeholder="tweet de tweetos"
                onChange={(e) => setTweet(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>submit</button>
            </form>
            <Disconnect />
        </div>
    )
}