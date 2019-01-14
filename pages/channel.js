import Link from 'next/link'
import Error from 'next/error'

import Layout from './../components/Layout'
import Series from './../components/Series'
import ListaPodcast from './../components/ListaPodcast'
import ListaPodcastClick from './../components/ListaPodcastClick'
import PodcastPlayer from './../components/PodcastPlayer';

export default class extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      openPodcast: null
    }
  }

  handleClickOpenPodcast = (e, podcast) => {
    e.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  handleClickClosePodcast = e => {
    e.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  static async getInitialProps({query, res}){
    let idChannel = query.id

    try{
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ])

      if (reqChannel.status >= 400){
        res.statusCode = reqChannel.status
        return { channel:null, series:null, audioClips:null, statusCode:reqChannel.status }
      }
      
      //repuesta request obtener información del canal
      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel
  
      //repuesta request obtener series hijas
      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels
      //console.log(series)
  
      //repuesta request obtener audios podcast
      let dataAudios = await reqAudios.json()
      let audioClips = dataAudios.body.audio_clips
      //console.log(audioClips)
  
      return { channel, series, audioClips, statusCode:200 }
    } catch(e){
      return { channel:null, series:null, audioClips:null, statusCode:503 }
    }
  }

  render(){
    const { channel, series, audioClips, statusCode } = this.props
    const { openPodcast } = this.state

    if(statusCode !== 200){
      return <Error statusCode={statusCode} />
    }

    return(
      <Layout title='Podcast'>

        { 
          openPodcast && 
            <PodcastPlayer 
              podcast = { openPodcast }  
              onClose = { this.handleClickClosePodcast }
            />
        }

        <h1>{ channel.title }</h1>

        <Series 
          series={series}
          title='series'
        />

        <ListaPodcastClick 
          audioClips = {audioClips}
          title = 'Ultimos Podcast'
          clickOpenPodcast = {this.handleClickOpenPodcast}
        />

        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }

          h1 {
            font-weight: 600;
            padding: 15px;
          }
        `}</style>
        
      </Layout>
    )
  }
}