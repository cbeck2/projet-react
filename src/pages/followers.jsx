import { TopPageNewTweet } from "../domain/tweets/component/TopPageNewTweet";
import { ShowFollowers } from "../domain/users/component/ShowFollowers"

export function Followers(){
    return(
        <div>
            <TopPageNewTweet/>
            <div className="mt-10 mx-auto w-full max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6">
            <h2 className="mb-4 text-lg sm:text-xl font-bold text-gray-800">
                Users following you:
            </h2>
            <ShowFollowers/>
            </div>
        </div>
    )
}