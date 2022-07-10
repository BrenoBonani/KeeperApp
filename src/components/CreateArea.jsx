import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false);


  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }


  function expand() {
    setIsExpanded(true);
  }


  return (
    <div>
      <form className="create-note">
        {
          isExpanded ? 
          <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        :
        null
        }
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
        <Fab
        onClick={submitNote}
        color="default"> <AddIcon /> 
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;




/* 

Primeiro eu vou criar uma function [note, setNote] e usar useState que vai ser um JS object que vai ser duas empty strings:


  const [note, setNote] = useState({
    title: "",
    content: ""
  });


  Depois, dentro dos meus inputs, eu coloco dois valores, um vai ser note.title e outro note.content. Dessa forma, eu consigo controlar melhor os meus inputs.
  O próximo passo, é atualiza-los quando mudarem. Por isso, adiciono onChange nos dois inputs e crio uma função chamada handleChange:

    function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

Dentro do handleChange, vai ter um event quando for acionado. E neste caso, eu usei o destructuring (desestruturei) o event para pegar o event.target.value.
Melhorando isso, eu crio uma const { name, value } = event.target;. Assim, eu posso usar esse name e value como const separadas e eu adiciono ao meu note, usando setNote.

Dentro do setNote(prevNote) vai ser capaz de receber a note anterior e eu vou usar ela para adicionar na nota existente, usar return com ...prevNote (usando spread operator),
e agora eu vou adicionar o [name]: value. Essa sintaxe [], transforma a string name no valor de fato da const que eu criei lá no início. O spread operator vai espalhar os pares de
key values que existem dentro do note que eu escrever e vai adicionar a esse último objeto que eu criei. Dessa forma, já é possível ver o que eu digito sendo armazenado no state.

Depois disso tudo, eu preciso passar de alguma forma essa nota recem criada de volta para o app. Já que que eu tenho um note criado na minha primeira const, eu posso usar o onClick
no meu botão (que é ele que deveria adicionar a nota né). Dessa forma, eu preciso de outra função para passar para o app:


  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }


A primeira coisa que eu fiz, foi tirar o efeito default do form, que é atualizar a página. Então, eu adiciono um event e coloco event.preventDefault(); para tirar essa atualização
automática. Depois, eu preciso acionar a função para que ela passe de volta para o app. Para isso, eu vou passar a função como uma props no CreateArea lá no app. Então, lá dentro do meu app.jsx 
eu vou criar outra função, chamada addNote():

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

Esse addNote, vai receber um newNote object. Que vai ter uma função, vai entrar como uma props no CreateArea. Eu vou chamar de onAdd e vai ser igual ao addNote.
Agora o CreateArea tem uma nova props, que se chama addNote. Agora eu volto para o createarea.jsx, adiciono props na função e dentro do submitNote eu adiciono:

props.onAdd(note); 

Feito isso, eu preciso passar para uma array vazia. Crio outra const [notes, setNotes] lá no app.jsx, uso useState com uma array vazia. Então, vai começar vazia 
e só quando o usuário adicionar, que vai popular ela. Por isso, que eu volto nela e coloco setNotes(prevNotes), crio a arrow function e retorno prevNotes usando 
spread operator, para que eu pegar todas as notas anteriores e adicionar na nota final. Por isso, eu adiciono newNote no final.

Por fim, eu pego o array e passo cada item para renderizar na tela. Até agora, lá no app.jsx eu não estava usando minha notes recem criada. Então, ao inves de ter 
apenas minha Note.jsx que tem uma array lá retornando, eu vou usar o map para mapear através dela e renderizar um componente de nota diferente para cada item lá dentro.

Meu map vai ter uma função, que vai ser uma arrow function, com um noteItem dentro. O map function vai fazer um loop dentro do array lá no Note.jsx e vai pegar cada item
dentro e executar essa função. Em seguida, vou retornar o Note component com algumas properties (props repassadas), que ai entra os noteItem.title e .content. E pronto. Implementei adicionar a
funcionalidade de adicionar as notas.

Agora, eu preciso só adicionar de deletar. Agora, dentro do meu arquivo Note.jsx, eu tenho um botão de delete e eu preciso que ele faça alguma ação, assim como o botão de adicionar.
Crio outra função então, handleClick e adiciono dentro do botão. Nessa função, vamos acionar pelos props que vão deletar a nota do meu array. Então, lá no meu app.jsx, eu vou criar também outra
função:

 function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

Nessa função, eu vou precisar do id das notas que vão ser deletadas. Então essa função vai ser passada para cada uma dessas notas que são renderizadas como uma propriedade. Então eu crio um onDelete=
dentro do meu return lá no notes.map e passo {deleteNote} como a função que vai ser passada. Agora eu volto lá no Note.jsx, crio props.onDelete() que vai acionar a função deleteNote(id) lá no app.jsx.

Para remover as notas do meu array, eu uso setNotes(prevNotes), crio uma arrow function e acesso as previous notes, que vai passar usando um filter() (filter function), que aceita até 3 argumentos. Dentro
do filter() eu passo outra arrow function. Dentro dela, eu vou passar o primeiro valor que estamos passando no momento, que é noteItem e o segundo é o index desse item. Dessa forma, pelo index eu vou conseguir
destinguir quais notas criadas podem ser apagadas. Então eu retorno, se o !index == (não for igual ao id da nota que precisa ser deletada), portanto ele deve deletar todas um array que contem todas as notas an
teriores, exceto aquelas correspondem ao id que vão ser excluidas.

Por isso que eu passei o key e o id dentro <Note /> lá no app.jsx como index. Quando a nova nota for renderizada, vai passar pelo índice no noteItem lá no array que podemos puxar lá do Note components (note.jsx).
Para que quando chamarmos props.onDelete, ele vai passar props.id e enviar de volta quando acionarmos o onDelete.



*/