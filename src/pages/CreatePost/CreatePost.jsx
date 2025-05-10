import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../contexts/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import styles from './CreatePost.module.css'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [formError, setFormError] = useState("")

  const { insertDocument, response } = useInsertDocument("posts")
  const { user } = useAuthValue()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // checar todos os valores
    if (!title || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
      return
    }

    const post = {
      title,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
      createdAt: new Date()
    }

    insertDocument(post)

    // redirect para home page
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar novo post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Criar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost