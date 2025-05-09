import { useState } from "react";
import { createPost } from '../../firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

function CreatePost(){
    const[title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { user } = useAuth;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !content){
            alert("Preencha todos os campos");
            return;
        }

        try {
            await createPost({ title, content, user });
            alert("Post criado com sucesso!");
            navigate("/dashboard");
        } catch (err) {
            alert("Erro ao criar post");
        }
    };

    return (
        <div>
            <h2>Criar Novo Post</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Título"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <textarea 
                    placeholder="Conteúdo"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <button type="submit">Publicar</button>
            </form>
        </div>
    );
}

export default CreatePost;