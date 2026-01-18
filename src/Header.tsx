import { useState } from "react"

type HeaderProps = {
    jobProjName: string
}

const Header = ({jobProjName}: HeaderProps)=> {

    const presetBanners = ["imagelink1","imagelink2", "imagelink3"]
    const [crntBanner, setCrntBanner] = useState(presetBanners[0]);
    
    function handleCrntBanner(e: React.ChangeEvent<HTMLInputElement>){
        setCrntBanner(e.target.value)
    }

    return(
        <section>
            <div>
                <img src="czxc" alt="" />
                <h1>{jobProjName}</h1>
            <svg></svg>
            </div>
            <>
                <img src={crntBanner} alt="Gradient Mesh" />
            </>
            <fieldset>
                <input type="radio" name="default" id="" checked={ crntBanner === presetBanners[0] } value={ presetBanners[0] } onChange={(e)=>{
                    handleCrntBanner(e);
                }}/>
                <input type="radio" name="default" id="" checked={ crntBanner === presetBanners[1] } value={ presetBanners[1] } onChange={(e)=>{
                    handleCrntBanner(e);

                }}/>
                <input type="radio" name="default" id="" checked={ crntBanner === presetBanners[2] } value={ presetBanners[2] } onChange={(e)=>{
                    handleCrntBanner(e);
                }}/>
            </fieldset>
        </section>
    )

}


export default Header