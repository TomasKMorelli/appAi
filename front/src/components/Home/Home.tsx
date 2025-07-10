"use client";
import Image from "next/image";
import { useState } from "react";

export default function HomeComponent() {
  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState("");
  const [text, setText] = useState("How are you?");
  const [selectedLanguage, setSelectedLanguage] = useState("French");

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowTranslation(true);
    setTranslation("Translating...");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: selectedLanguage }),
      });

      const data = await res.json();
      const translationText =
        data?.translation?.translation ?? data?.translation ?? null;

      if (typeof translationText === "string") {
        setTranslation(translationText);
      } else if (data?.error) {
        setTranslation(`Error: ${data.error}`);
      } else {
        setTranslation("Error: respuesta inválida del servidor");
      }
    } catch (error) {
      setTranslation("Error: no se pudo conectar con el servidor");
    }
  };

  const handleStartOver = () => {
    setShowTranslation(false);
    setTranslation("");
  };

  return (
    <div
      className="w-[390px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      style={{ height: "780px" }}
    >
      {/* Header */}
      <div className="relative bg-[#16213e] h-[160px] flex items-center px-6">
        <Image
          src="/parrrot.png"
          alt="Parrot"
          width={80}
          height={80}
          className="absolute left-4 top-4 z-10 border border-gray-300 rounded-full bg-white"
        />
        <Image
          src="/assets/worldmap.png"
          alt="World Map"
          fill
          className="object-cover opacity-20 absolute inset-0 z-0"
        />
        <div className="relative z-20 flex flex-col justify-center items-start ml-24">
          <h1 className="text-3xl font-extrabold text-green-500">PollyGlot</h1>
          <h3 className="text-white text-base font-medium mt-1">
            Perfect Translation Every Time
          </h3>
        </div>
      </div>

      {/* Formulario */}
      {!showTranslation && (
        <div className="p-6 pt-8">
          <div className="border-2 border-[#16213e] rounded-xl p-4">
            <h2 className="text-[#16213e] text-lg font-bold text-center mb-2">
              Text to translate <span className="ml-1">👇</span>
            </h2>
            <textarea
              className="w-full h-20 rounded-lg bg-gray-100 p-3 text-gray-800 font-medium resize-none outline-none mb-4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <h2 className="text-[#16213e] text-lg font-bold text-center mb-2 mt-2">
              Select language <span className="ml-1">👇</span>
            </h2>
            <form className="flex flex-col gap-2 mb-4" onSubmit={handleTranslate}>
              <label className="flex items-center gap-2 font-bold text-black">
                <input
                  type="radio"
                  name="language"
                  value="French"
                  checked={selectedLanguage === "French"}
                  onChange={() => setSelectedLanguage("French")}
                  className="accent-blue-600"
                />
                French{" "}
                <span className="ml-1">
                  <Image
                    src="https://flagcdn.com/fr.svg"
                    alt="French"
                    width={24}
                    height={16}
                    className="border border-gray-400 rounded"
                  />
                </span>
              </label>
              <label className="flex items-center gap-2 font-bold text-black">
                <input
                  type="radio"
                  name="language"
                  value="Spanish"
                  checked={selectedLanguage === "Spanish"}
                  onChange={() => setSelectedLanguage("Spanish")}
                  className="accent-blue-600"
                />
                Spanish{" "}
                <span className="ml-1">
                  <Image
                    src="https://flagcdn.com/es.svg"
                    alt="Spanish"
                    width={24}
                    height={16}
                    className="border border-gray-400 rounded"
                  />
                </span>
              </label>
              <label className="flex items-center gap-2 font-bold text-black">
                <input
                  type="radio"
                  name="language"
                  value="Japanese"
                  checked={selectedLanguage === "Japanese"}
                  onChange={() => setSelectedLanguage("Japanese")}
                  className="accent-blue-600"
                />
                Japanese{" "}
                <span className="ml-1">
                  <Image
                    src="https://flagcdn.com/jp.svg"
                    alt="Japanese"
                    width={24}
                    height={16}
                    className="border border-gray-400 rounded"
                  />
                </span>
              </label>
              <button
                type="submit"
                className="w-full bg-[#1849a2] text-white font-bold py-2 rounded-lg text-lg mt-4"
              >
                Translate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Resultado de la traducción */}
      {showTranslation && (
        <div className="p-6 pt-8">
          <div className="border-2 border-[#16213e] rounded-xl p-4">
            <h2 className="text-[#1849a2] text-lg font-bold text-center mb-2">
              Original text <span className="ml-1">👇</span>
            </h2>
            <div className="w-full h-20 rounded-lg bg-gray-100 p-3 text-gray-800 font-bold text-lg flex items-center mb-4">
              {text}
            </div>
            <h2 className="text-[#1849a2] text-lg font-bold text-center mb-2 mt-2">
              Your translation <span className="ml-1">👇</span>
            </h2>
            <div className="w-full h-20 rounded-lg bg-gray-100 p-3 text-gray-800 font-bold text-lg flex items-center mb-4">
              {translation}
            </div>
            <button
              onClick={handleStartOver}
              className="w-full bg-[#1849a2] text-white font-bold py-2 rounded-lg text-lg mt-2"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
