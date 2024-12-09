import { dotWave } from 'ldrs'

export default function Loader(){
    dotWave.register()
    return ( <>
        <l-dot-wave
            size="65"
            speed="1" 
            color="#2A5EAD" 
        ></l-dot-wave>
      </>
    )
}