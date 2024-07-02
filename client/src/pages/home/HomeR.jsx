import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import "./home.css"

const HomeR = () => {
  return (
    <div className="home">
      <Stories/>
      <Posts/>
    </div>
  )
}

export default HomeR