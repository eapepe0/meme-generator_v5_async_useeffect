import React from "react";
/* LA PAGINA CUANDO CARGA LA 1era VEZ USA LOS DATOS DEFINIDOS EN USESTATE, CUANDO CLICKEAMOS EL BOTON */
/* SACAMOS UN NUMERO ALEATORIO , CON ESE NUMERO , SACAMOS UNA URL */
/*  */

export default function Main() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });

  /* en allMemesInages esta todo vacio*/
  const [allMemes, setAllMemes] = React.useState([]);

  /* useEffect toma una funcion como parametro, si esa funcion devuelve algo,tiene que haber una funcion
    de limpieza.
    Si utilizamos una funcion async, automaticamente devuelve una promesa, en lugar de una funcion o de nada
    Sin embargo si queres usar una funcion async dentro de useEffect, tendras que definirla separadamemte,
    dentro de la fuincion callback como se puede ver a continuacion */

  React.useEffect(() => {
    async function getMemes() {
      // creamos la funcion async
      const res = await fetch("https://api.imgflip.com/get_memes"); // pedimos en la api
      const data = await res.json(); // la respuesta la convertimos en json
      setAllMemes(data.data.memes); // a la data se carga en allMemes
    }
    getMemes(); // llamamos la funcion
  }, []); // se carga una sola vez

  function getMemeImage() {
    /* funcion que se llama cuando apretamos el boton */
    let number = Math.floor(
      Math.random() * allMemes.length // allMemes es un array
    ); /* sacamos un numero random */

    const url = allMemes[number].url;
    /* sacamos una url, random del array */
    setMeme((prevMeme) => ({
      /* toma una version previa a meme */
      ...prevMeme /* hace un spread, le cambiamos el dato , randomImage, por la sacada en url */,
      randomImage: url
    }));
  }

  function getTextInput(event) {
    // creamos una funcion que maneje el evento , recibe el evento
    const { name, value } = event.target; // saca el name y el valor de donde es llamado en este caso un input
    setMeme((prevMeme) => ({
      // cambia el valor del useState
      ...prevMeme,
      [name]: value // cambia el nombre , es este caso es igual al objeto bottomText/topText y el valor que escribimos
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          name="topText" // name igual al del objeto
          onChange={getTextInput} // funcion que maneja el evento onChange
          className="form--input"
        />
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          onChange={getTextInput}
          className="form--input"
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} alt="meme-random" className="meme--image" />
        <h2 className="meme--text top"> {meme.topText}</h2>{" "}
        {/* escribimos lo que cambiamos en la funcion */}
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
        {/* escribimos lo que cambiamos en la funcion */}
      </div>
    </main>
  );
}
