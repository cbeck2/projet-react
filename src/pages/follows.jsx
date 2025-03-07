import { TopPageNewTweet } from "../domain/tweets/component/TopPageNewTweet";
import { ShowFollows } from "../domain/users/component/ShowFollows"

export function Follows(){
    return(
        <div>
            <TopPageNewTweet/>
            <div className="mt-10 mx-auto w-full max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <h2 className="mb-4 text-lg sm:text-xl font-bold text-gray-800">
                    Users following you:
                </h2>
                <ShowFollows/>
            </div>
        </div>
    )
}