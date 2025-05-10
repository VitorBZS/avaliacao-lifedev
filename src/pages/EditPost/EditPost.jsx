import { useParams, useNavigate } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useAuthValue } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import styles from './EditPost.module.css'

const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const { user } = useAuthValue()
  const { updateDocument, response } = useUpdateDocument("posts")
  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])

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

    const data = {
      title,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    await updateDocument(id, data)

    // redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="text"
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost 