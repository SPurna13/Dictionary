import react,{useState} from 'react'
function Dict()
{
    const [mean,setMean]=useState('')
    const [phon,setPhon]=useState('')
    const [meaning,setMeaning]=useState('')
    const [phonetic,setPhonetic]=useState('')
    const [audio,setAudio]=useState('')
    function search()
    {
    setMean('');setPhon('');setMeaning('');setPhonetic('')
    let word=document.getElementById('txt');
    searchWord(word.value);
    }
    async function searchWord(word)
    {
        const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
        try{
            if(!response.ok)
            {
                throw new Error("its an error");
            }
            else{
            let resdata=await response.json();
            let aud=resdata[0].phonetics[0].audio;
            let dt=resdata[0].meanings[0].definitions[0].definition;
            let dt1=resdata[0].phonetics[1].text;
            console.log(resdata);
            if (aud.length==0)
            {
                alert("Sorry,no audio available");
            }
            setAudio(aud);
            setMean(dt);
            setPhon(dt1);
            setMeaning('Meaning: ');
            setPhonetic('Phonetic: ');
            }
        }
        catch(error)
        {
            let dt="Enter a proper word";
            setMean(dt);
        }
    }
    return(
        <>
        <h1>DICTIONARY</h1>
        <div className='con'>
        <input id="txt"></input>
        <button onClick={search}>search</button>
        </div>
        <div className='content'>
        <audio controls src={audio}>Heyyy</audio>
        <h3><span>{meaning}</span>{mean}</h3>
        <h3><span>{phonetic}</span>{phon}</h3>
        </div>
        </>
    )
}
export default Dict