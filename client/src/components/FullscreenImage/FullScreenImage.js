import { useParams } from "react-router-dom"


export default function FullscreenImage () {

    const imageId = useParams()

    return (
        <>
            <p>You're on the image</p>
            <img loading="lazy" width={500} height={500} src={"http://localhost:3000/image" + imageId.id}></img>
        </>

    )
}