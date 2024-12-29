import SupportForm from "../../../components/reusableComponents/SupportForm";

const ContactDetails = () => {
  const chatoptions = [
    {
      text: "Chat to our marketting team",
      subtext:
        "Ready to join the team? contact and talk to our friendly marketting team",
      link: "marketting@dzidzi.com",
    },
    {
      text: "Email Support",
      subtext: "Send any enquiries to us by email!",
      link: "support@dzidzi.com",
    },
    {
      text: "Call us",
      subtext: "We are available Mon - Fri 8am - 4pm to answer your calls",
      link: "+4918298128219",
    },
    {
      text: "Visit our office",
      subtext: "Pressing issues? Visit us for a chat",
      link: "Poland, Wroclaw",
    },
  ];

  return (
    <div className="">
      {chatoptions.map((item, idx) => {
        return (
          <div key={idx} className="flex flex-col border-b-2 gap-3">
            <p className={`font-bold text-sm ${idx != 0 && "mt-6"}`}>
              {item.text}
            </p>
            <p className="font-light text-xs">{item.subtext}</p>
            <p className="font-bold text-gray-500 text-xs mb-4">{item.link}</p>
          </div>
        );
      })}
    </div>
  );
};

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
        <SupportForm />
        <ContactDetails />
      </div>
    </div>
  );
};

export default Support;
