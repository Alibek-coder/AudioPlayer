import { useRef, useState } from "react";

export const AudioPlayer = () => {

    const audioEl = useRef<HTMLAudioElement>(null);
    const tracks = [
        {
            img: 'https://jarjad.ru/mmatch/cover/Nx115x5252.png.pagespeed.ic.UzDzQbTdC_.webp',
            author: 'ONEIL, FAVIA, Aize ',
            track: '/public/audio/Heartbeat.mp3'
        },
        {
            img: 'https://jarjad.ru/mmatch/cover/Nx115x5238.png.pagespeed.ic.3Wu8XuGbfH.webp',
            author: 'Calvin Harris',
            track: '/public/audio/Calvin Harris.mp3'
        },
        {
            img: 'https://jarjad.ru/mmatch/cover/Nx115x5248.png.pagespeed.ic.Em2XxptI_N.webp',
            author: 'Playmen',
            track: '/public/audio/Love You.mp3'
        },
        {
            img: 'https://jarjad.ru/mmatch/cover/Nx115x5073.png.pagespeed.ic.qpG3Ov5MmQ.webp',
            author: 'Nils van Zandt & Pakito ',
            track: '/public/audio/Pakito Lonely.mp3'
        }
    ];
    const [count, setCount] = useState(0);
    const [widthPlay, setWidthPlay] = useState(0);

    const play = () => {
        audioEl.current?.play();
    }

    const pause = () => {
        audioEl.current?.pause();
    }

    const prev = () => {
        let i = count - 1
        if (i < 0) {
            setCount(tracks.length - 1);
        } else {
            setCount(count - 1);
        }        
    }

    const next = () => {
        let i = count + 1
        if (i === tracks.length) {
            setCount(0);
        } else {
            setCount(count + 1);
        }        
    }

    const progress = () => {
        const curTime = audioEl.current?.currentTime;
        const duration = audioEl.current?.duration;
        let width: number | undefined;
        if (curTime && duration) {
            width = (curTime / duration) * 100
        } else{
            width = 0;
        }
        setWidthPlay(width);
    }

    return (
        <div id="player">
            <audio onTimeUpdate={progress} src={tracks[count].track} ref={audioEl} controls autoPlay> </audio>
            <img src={tracks[count].img} alt="#" />
            <div>Author: {tracks[count].author}</div>
            <div>{(audioEl.current?.duration)?.toFixed(1)} c</div>
            <div id="progressContainer">
                <div id="progress" style={{ width: `${widthPlay}%` }}></div>
            </div>

            <div>
                <button onClick={prev}>{'<<<'}</button>
                <button onClick={play}>Play</button>
                <button onClick={pause}>Pause</button>
                <button onClick={next}>{'>>>'}</button>
            </div>
        </div>
    )
}