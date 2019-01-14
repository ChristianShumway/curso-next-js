import Link from 'next/link'
import slug from './../helpers/slugs'

export default class ListaPodcast extends React.Component{

  render(){
    const { audioClips, title, clickOpenPodcast } = this.props

    return(
      <div>
        <h2>{ title }</h2>
        { audioClips.map((clip) => (
          <a 
            href={ `/${slug(clip.channel.title)}.${clip.channel.id}/${slug(clip.title)}.${clip.id}` }
            onClick = { (e) => clickOpenPodcast(e, clip) }
            className='podcast'
          >
            <h3>{ clip.title }</h3>
            <div className='meta'>
              { Math.ceil(clip.duration / 60) } minutes
            </div>
          </a>
        ))}

        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }

          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }

          .podcast {
            display: block;
            text-decoration: none;
            color: #333;
            padding: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            cursor: pointer;
          }
          .podcast:hover {
            color: #000;
          }
          .podcast h3 {
            margin: 0;
          }
          .podcast .meta {
            color: #666;
            margin-top: 0.5em;
            font-size: 0.8em;
          }
        `}</style>
      </div>
    )
  }
}