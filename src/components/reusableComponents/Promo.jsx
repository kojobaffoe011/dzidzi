import rider from "../../assets/images/motorbike.png";
import cerified from '../../assets/images/certified.png'
import lighting from "../../assets/images/lighting.png";



function Promo() {

const promo = [
  {
    text:  <p className="font-logo font-extrabold text-5xl text-white">
                    dzidzi <span className="">riders</span>
                  </p>,
    subtext: 'fast and accurate',
    image: rider,
    color: 'bg-red-300',
    lighting: true


  },
  {
    text:  <p className="font-logo font-extrabold text-5xl text-white">
                    dzidzi <span className="">foods</span>
                  </p>,
    subtext: 'why choose us?',
    image: cerified,
    color: 'bg-blue-300',
    lighting: false


  },
]

  return (
    <div className="grid grid-cols-2 py-4 gap-6">
      {promo.map((i,id)=> {
        return (
           <div className="w-full gap-2 " key={id}>
            
              <div className={`h-[200px] rounded-xl ${i.color} grid grid-cols-5 p-2 z-[2]`}>
              <img src={i.image} alt="" width='240' className="col-span-2"/>
              <div className="col-span-3 flex flex-col justify-end h-[180px] relative">
               {i.lighting && <div className="absolute z-[1] top-[-22px] right-12 from-transparent"><img src={lighting} alt="" width={250} className=""/>
                </div> } 
                <div className="flex flex-col gap-2 font-bold text-3xl absolute z-[2]">
                  <p className="font-fast text-white text-4xl">{i.subtext}</p>
                  {i.text}
                </div>
                 
              </div>
              </div>
            </div>
        )
      })}
           
    </div>
  );
}

export default Promo