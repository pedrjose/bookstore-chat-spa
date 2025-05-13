import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [responseMessage, setResponseMessage] = useState("Me pergunte algo!");
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = async ({ prompt }) => {
    try {
      const { data } = await axios.post("http://localhost:3000/conversation", {
        message: prompt,
      });

      setResponseMessage(data);
    } catch (error) {
      setResponseMessage("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <section className="section-settings">
      <div className="chat-box">
        <p className="p-settings">{responseMessage}</p>
      </div>

      <form className="ask-box" onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          <input
            className="form-style"
            {...register("prompt")}
            type="text"
            placeholder="Pergunte algo para o BookStoreChatbot"
          />
        </label>
        <button type="submit" className="button-style">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default App;
