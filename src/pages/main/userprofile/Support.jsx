import Button from "../../../components/reusableComponents/Button"

const SupportForm = ()=>{
    return <div>
         <form action="" className='flex flex-col w-full gap-6'>
              <div className="flex flex-col gap-6 col-span-2">
              <div className="flex flex-col gap-2">
                <div className="w-full flex flex-col gap-1 col-span-2 ">
                  
                   <label className="text-xs font-light text-gray-500">
                    What is the issue?
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <select
                  //  {...register("email")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder=""
                    name="oldpassword"
                    required
                    type=""
                  >
                    <option value=""> General Enquiries</option>
                    <option value=""> I have issues with my order</option>
                    <option value=""> Other</option>
                  </select>
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    Enter a subject
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  //  {...register("username")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter subject heading here"
                    name="newpassword"
                    required
                    type="password"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    Description
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <textarea
                  //  {...register("username")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs h-[300px]"
                    placeholder="Enter your message here"
                    name="repeatpass"
                    required
                    type="password"
                  />
                </div>
              </div>



               <div className=" mb-8 w-full flex">
              {" "}
                <Button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                  // disabled={isPending || creatingUserPending || dataLoading}
                >
                  {/* {(isPending || creatingUserPending || dataLoading )? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    // <p className="text-white text-sm">Finish</p> */}
                     <p className='font-bold text-white'>Send Message</p>
                  {/* )} */}
                 
                </Button>
            </div>
            </div>
            </form>
    </div>
}


const ContactDetails = () => {

    const chatoptions = [
        {
            text: 'Chat to our marketting team',
            subtext: 'Ready to join the team? contact and talk to our friendly marketting team',
            link: 'marketting@dzidzi.com'
        },
        {
            text: 'Email Support',
            subtext: 'Send any enquiries to us by email!',
            link: 'support@dzidzi.com'
        },
        {
            text: 'Call us',
            subtext: 'We are available Mon - Fri 8am - 4pm to answer your calls',
            link: '+4918298128219'
        },
        {
            text: 'Visit our office',
            subtext: 'Pressing issues? Visit us for a chat',
            link: 'Poland, Wroclaw'
        },
    ]

    return <div className="">
            {chatoptions.map((item, idx)=>{
                return <div key={idx} className="flex flex-col border-b-2 gap-3">
                    <p className={`font-bold text-sm ${idx != 0 && 'mt-6'}`}>{item.text}</p>
                    <p className="font-light text-xs">{item.subtext}</p>
                    <p className="font-bold text-gray-500 text-xs mb-4">{item.link}</p>
                </div>
            })}
    </div>
}

const Support = () => {
  return (
     <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
                <p className="font-bold">Contact Support</p>
              
            </div>
            <div className="mt-2">
                 <p className="text-xs italic font-thin">{`Send a message to our friendly support team`}</p>
            </div>

            <div className="grid grid-cols-3 gap-24">
                <SupportForm/>
                <ContactDetails/>

            </div>
        </div>
  )
}

export default Support