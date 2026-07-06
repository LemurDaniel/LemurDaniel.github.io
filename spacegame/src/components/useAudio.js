import { useState, useEffect, useRef } from 'react'

const useAudio = () => {

    const base = process.env.PUBLIC_URL
    const [sounds, setSounds] = useState({});
    const soundRef = useRef(sounds);

    // Using ref so that the initial return play function always has the correct reference to the new sounds-object.
    soundRef.current = sounds;

    const getSoundEffects = async () => {

        try {
            let response = await fetch(base + "/assets/sounds/soundeffects.json")
            response = await response.json()
            Object.keys(response).forEach(key => response[key] = new Audio(base + response[key]))
            setSounds(response);
        } catch (exception) {
            console.log(exception)
        }

    }
    useEffect(() => {
        getSoundEffects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const playSound = (filename, volume = 0.15, playSingle = false) => {

        if (!(filename in soundRef.current)) return;

        const audio = playSingle ? soundRef.current[filename] : new Audio(soundRef.current[filename].src);
        audio.volume = volume;
        audio.play();

    }

    const toggleLoop = (filename, loop = true, volume = 0.15) => {

        if (!(filename in soundRef.current)) return;

        const audio = soundRef.current[filename];
        audio.volume = volume;

        audio.loop = loop;
        if (audio.loop) audio.play();
        else audio.pause()
    }


    return [playSound, toggleLoop]
}


export default useAudio