import PodcastPlayer from './../components/PodcastPlayer'

export default class extends React.Component{
  static async getInitialProps({query}){
    //console.log(query)
    let idPodcast = query.id
    let reqPodcast = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`)
    let dataPodcast = await reqPodcast.json()
    let podcast = dataPodcast.body.audio_clip
    //console.log(podcast)
    return { podcast }
  }
  render(){
    const { podcast } = this.props
    console.log(podcast)
    return(
      <PodcastPlayer podcast = { podcast } />  
    )
  }
}