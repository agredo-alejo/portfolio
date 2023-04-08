import React, { FormEvent, useState } from "react";

function ContactForm() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");

   const sendEmail = async (e: FormEvent) => {
      e.preventDefault();
      try {
         await fetch("/api/send_email", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name,
               email,
               message,
            }),
         });

         setName("");
         setEmail("");
         setMessage("");
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <form className="flex flex-col max-w-xl mt-4 w-80" onSubmit={sendEmail}>
         <div className="inputBox">
            <input
               required
               type="text"
               id="name"
               name="name"
               placeholder="Name"
               className="inputs"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>
         <div className="inputBox">
            <input
               required
               type="email"
               name="user_email"
               id="user_email"
               placeholder="Email"
               className="inputs"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>
         <div className="inputBox">
            <textarea
               required
               className="resize-y inputs h-28"
               name="message"
               id="message"
               placeholder="Message"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            ></textarea>
         </div>

         <div className="w-full">
            <button
               id="submit"
               className="float-right p-2 text-white bg-transparent border-none cursor-pointer customShadow"
               type="submit"
            >
               Submit
            </button>
         </div>
      </form>
   );
}

export default ContactForm;
