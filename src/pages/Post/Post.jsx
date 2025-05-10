import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import styles from './Post.module.css'

const Post = () => {
  const { id } = useParams()
  const { document: post, loading } = useFetchDocument("posts", id)

  if (loading) {
    return <p>Carregando post...</p>
  }

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className={styles.createdby}>
            por: {post.createdBy}
          </p>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
          <p className={styles.body}>{post.body}</p>
        </>
      )}
    </div>
  )
}

export default Post 